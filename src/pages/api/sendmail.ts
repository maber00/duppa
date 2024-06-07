// duppa/src/pages/api/sendmail.ts

import type { APIContext } from 'astro';
import sendGrid from '@sendgrid/mail';

sendGrid.setApiKey(import.meta.env.SENDGRID_API_KEY);

interface FormValues {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company: string;
}

const validateFormData = (data: FormData): FormValues | null => {
  const formValues: Partial<FormValues> = {
    first_name: data.get('first_name')?.toString(),
    last_name: data.get('last_name')?.toString(),
    email: data.get('email')?.toString(),
    phone: data.get('phone')?.toString(),
    company: data.get('company')?.toString(),
  };

  return Object.values(formValues).every(value => value) 
    ? formValues as FormValues 
    : null;
};

const sendEmail = async (formValues: FormValues) => {
  const { first_name, last_name, email, phone, company } = formValues;
  const name = `${first_name} ${last_name}`;

  const msg = {
    to: 'manuel@duppa.co',
    from: 'bienvenido@duppa.co',
    replyTo: { email, name },
    subject: `Envío del formulario de contacto de ${name}`,
    text: `Nombre: ${name}\nEmail: ${email}\nTeléfono: ${phone}\nCompañía: ${company}`,
  };

  try {
    await sendGrid.send(msg);
    console.log('Correo enviado');
    return true;
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return false;
  }
};

export async function post(context: APIContext) {
  const formData = await context.request.formData();
  const validatedData = validateFormData(formData);

  if (!validatedData) {
    return new Response(JSON.stringify({ error: 'Todos los campos son requeridos.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const emailSent = await sendEmail(validatedData);

  return new Response(JSON.stringify({
    message: emailSent ? 'Formulario enviado exitosamente' : 'Error al enviar el formulario'
  }), {
    status: emailSent ? 200 : 500,
    headers: { 'Content-Type': 'application/json' },
  });
}
