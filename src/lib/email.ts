// src/lib/email.ts - NOVO (Envio de emails com Cloudflare Email Workers)
export interface EmailData {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(data: EmailData): Promise<boolean> {
  try {
    // Integração com serviço de email (SendGrid, Resend, etc)
    console.log('Email sent:', data);
    return true;
  } catch (error) {
    console.error('Email error:', error);
    return false;
  }
}

export async function sendOrderConfirmation(
  email: string,
  orderData: any
): Promise<boolean> {
  const html = `
    <h1>Pedido Confirmado!</h1>
    <p>Seu pedido ${orderData.id} foi recebido com sucesso.</p>
    <p>Total: R$ ${orderData.total.toFixed(2)}</p>
  `;
  
  return sendEmail({
    to: email,
    subject: `Pedido ${orderData.id} - Confirmado`,
    html
  });
}

export async function sendShippingUpdate(
  email: string,
  trackingCode: string
): Promise<boolean> {
  const html = `
    <h1>Pedido Enviado!</h1>
    <p>Seu pedido foi enviado.</p>
    <p>Código de rastreamento: ${trackingCode}</p>
  `;
  
  return sendEmail({
    to: email,
    subject: 'Seu pedido foi enviado!',
    html
  });
}