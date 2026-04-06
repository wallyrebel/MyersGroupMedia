/**
 * Cloudflare Pages Function — contact form handler.
 * Posts the message via Resend (set RESEND_API_KEY + CONTACT_TO env vars in Cloudflare Pages dashboard).
 */
interface Env {
  RESEND_API_KEY: string;
  CONTACT_TO: string;
  CONTACT_FROM?: string;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const ct = request.headers.get("content-type") || "";
    let data: Record<string, FormDataEntryValue | string[]> = {};

    if (ct.includes("application/json")) {
      data = await request.json();
    } else {
      const form = await request.formData();
      for (const [k, v] of form.entries()) {
        if (k === "services") {
          data.services = form.getAll("services").map(String);
        } else {
          data[k] = v;
        }
      }
    }

    const { name, email, company, message } = data as Record<string, string>;
    const services = (data.services as string[]) || [];

    if (!name || !email || !message) {
      return new Response("Missing required fields.", { status: 400 });
    }

    if (!env.RESEND_API_KEY || !env.CONTACT_TO) {
      // Graceful fallback — log and 200 so the form still feels working in dev.
      console.log("[contact] Missing RESEND_API_KEY or CONTACT_TO — would have sent:", data);
      return Response.redirect(new URL("/contact?status=success", request.url).toString(), 303);
    }

    const html = `
      <h2>New project inquiry — ${escapeHtml(name)}</h2>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Company:</strong> ${escapeHtml(company || "—")}</p>
      <p><strong>Services:</strong> ${escapeHtml(services.join(", ") || "—")}</p>
      <hr>
      <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.CONTACT_FROM || "Myers Group Media <hello@myersgroupmedia.com>",
        to: env.CONTACT_TO.split(",").map((s) => s.trim()),
        reply_to: email,
        subject: `New inquiry from ${name}`,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[contact] Resend error:", err);
      return new Response("Failed to send.", { status: 500 });
    }

    return Response.redirect(new URL("/contact?status=success", request.url).toString(), 303);
  } catch (e) {
    console.error("[contact] Exception:", e);
    return new Response("Server error.", { status: 500 });
  }
};

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}
