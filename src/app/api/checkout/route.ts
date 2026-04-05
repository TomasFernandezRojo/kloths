import { NextRequest, NextResponse } from "next/server";
import MercadoPago, { Preference } from "mercadopago";
import { products } from "@/data/products";

const client = new MercadoPago({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});
const preference = new Preference(client);

type CartItemInput = {
  slug: string;
  quantity: number;
  size: string;
};

function calcularEnvio(cp: string, subtotal: number): number {
  if (subtotal >= 70000) return 0;

  const sanitized = cp.trim().replace(/\D/g, "");
  const cpNum = parseInt(sanitized, 10);
  if (isNaN(cpNum) || sanitized.length < 4) return 8000;

  // Pilar y alrededores
  if ((cpNum >= 1629 && cpNum <= 1638) || cpNum === 1669) return 0;

  // AMBA / GBA
  if (
    sanitized.startsWith("16") ||
    sanitized.startsWith("17") ||
    sanitized.startsWith("18") ||
    sanitized.startsWith("19") ||
    (cpNum >= 1000 && cpNum <= 1499)
  ) {
    return 5000;
  }

  // Interior
  return 8000;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { items: CartItemInput[]; postalCode: string };

    const { items: rawItems, postalCode } = body;

    // Sanitize inputs
    if (!Array.isArray(rawItems) || rawItems.length === 0) {
      return NextResponse.json({ error: "Carrito vacío" }, { status: 400 });
    }

    const sanitizedCp = String(postalCode ?? "").trim().replace(/\D/g, "").slice(0, 8);

    // Validate and build items using SERVER-SIDE prices
    const validatedItems: {
      id: string;
      title: string;
      quantity: number;
      unit_price: number;
      currency_id: string;
    }[] = [];

    let subtotal = 0;

    for (const item of rawItems) {
      const slug = String(item.slug ?? "").trim().slice(0, 100);
      const quantity = Math.max(1, Math.min(99, parseInt(String(item.quantity), 10) || 1));
      const size = String(item.size ?? "").trim().slice(0, 20);

      const product = products.find((p) => p.slug === slug);
      if (!product) {
        return NextResponse.json({ error: `Producto no encontrado: ${slug}` }, { status: 400 });
      }

      const unitPrice = product.price; // always server price
      subtotal += unitPrice * quantity;

      validatedItems.push({
        id: product.slug,
        title: `${product.name}${size ? ` — Talle ${size}` : ""}`,
        quantity,
        unit_price: unitPrice,
        currency_id: "ARS",
      });
    }

    // Shipping
    const shippingCost = calcularEnvio(sanitizedCp, subtotal);
    if (shippingCost > 0) {
      validatedItems.push({
        id: "envio",
        title: "Envío",
        quantity: 1,
        unit_price: shippingCost,
        currency_id: "ARS",
      });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://kloths.com.ar";

    const result = await preference.create({
      body: {
        items: validatedItems,
        back_urls: {
          success: `${baseUrl}/checkout/success`,
          failure: `${baseUrl}/checkout/failure`,
          pending: `${baseUrl}/checkout/pending`,
        },
        statement_descriptor: "KLOTHS",
        metadata: { postal_code: sanitizedCp },
      },
    });

    return NextResponse.json({ init_point: result.init_point });
  } catch (err: unknown) {
    console.error("=== MercadoPago error completo ===");
    console.error("Tipo:", typeof err);
    console.error("Mensaje:", err instanceof Error ? err.message : String(err));
    try {
      console.error("JSON:", JSON.stringify(err, Object.getOwnPropertyNames(err as object), 2));
    } catch {
      console.error("(no serializable)");
    }
    // Si MP devuelve una respuesta HTTP con detalles
    const mpErr = err as Record<string, unknown>;
    if (mpErr?.cause) console.error("cause:", JSON.stringify(mpErr.cause, null, 2));
    if (mpErr?.response) console.error("response:", JSON.stringify(mpErr.response, null, 2));
    if (mpErr?.status) console.error("status:", mpErr.status);

    const msg = err instanceof Error ? err.message : "Error al crear la preferencia";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
