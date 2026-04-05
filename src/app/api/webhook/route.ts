import { NextRequest, NextResponse } from "next/server";
import MercadoPago, { Payment } from "mercadopago";
import nodemailer from "nodemailer";

const client = new MercadoPago({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

function formatPrice(n: number) {
  return "$" + n.toLocaleString("es-AR");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { type?: string; data?: { id?: string } };

    // MercadoPago también puede enviar el id como query param
    const { searchParams } = new URL(req.url);
    const type = body.type ?? searchParams.get("type");
    const paymentId = body.data?.id ?? searchParams.get("data.id");

    if (type !== "payment" || !paymentId) {
      return NextResponse.json({ ok: true });
    }

    const paymentApi = new Payment(client);
    const payment = await paymentApi.get({ id: paymentId });

    if (payment.status !== "approved") {
      return NextResponse.json({ ok: true });
    }

    // Extraer datos del metadata de la preferencia
    const meta = payment.metadata as {
      phone?: string;
      address?: string;
      city?: string;
      province?: string;
      postal_code?: string;
      subtotal?: number;
      shipping_cost?: number;
      items?: { name: string; size: string; quantity: number; price: number }[];
    } | undefined;

    const items = meta?.items ?? [];
    const subtotal = meta?.subtotal ?? payment.transaction_amount ?? 0;
    const shippingCost = meta?.shipping_cost ?? 0;
    const total = subtotal + shippingCost;

    const itemsText = items
      .map((i) => `  • ${i.name}${i.size ? ` — Talle ${i.size}` : ""} × ${i.quantity}  →  ${formatPrice(i.price * i.quantity)}`)
      .join("\n");

    const emailBody = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━
 NUEVA VENTA — kloths.
━━━━━━━━━━━━━━━━━━━━━━━━━━━

PEDIDO:
${itemsText || "  (detalle no disponible)"}

  Subtotal:   ${formatPrice(subtotal)}
  Envío:      ${shippingCost === 0 ? "Gratis" : formatPrice(shippingCost)}
  ──────────────────────────
  TOTAL:      ${formatPrice(total)}

CLIENTE:
  Celular:    ${meta?.phone || "—"}
  Dirección:  ${meta?.address || "—"}
  Ciudad:     ${meta?.city || "—"}
  Provincia:  ${meta?.province || "—"}
  Código postal: ${meta?.postal_code || "—"}

PAGO:
  ID MercadoPago: ${paymentId}
  Estado: Aprobado ✓

━━━━━━━━━━━━━━━━━━━━━━━━━━━
`.trim();

    await transporter.sendMail({
      from: `"kloths." <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `🛒 Nueva venta — ${formatPrice(total)}`,
      text: emailBody,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Webhook error:", err);
    // Siempre devolvemos 200 para que MP no reintente infinitamente
    return NextResponse.json({ ok: true });
  }
}

// MercadoPago a veces hace GET para verificar el endpoint
export async function GET() {
  return NextResponse.json({ ok: true });
}
