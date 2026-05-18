import { useEffect, useRef } from "react";

/**
 * Razorpay hosted payment button. Embeds a single <form> with their script.
 * We inject via DOM (not dangerouslySetInnerHTML) so React doesn't fight the
 * Razorpay script when it mounts the button into the form.
 */
export function RazorpayButton({ paymentButtonId }: { paymentButtonId: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    host.innerHTML = "";
    const form = document.createElement("form");
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/payment-button.js";
    script.async = true;
    script.setAttribute("data-payment_button_id", paymentButtonId);
    form.appendChild(script);
    host.appendChild(form);
    return () => { host.innerHTML = ""; };
  }, [paymentButtonId]);

  return <div ref={ref} className="flex justify-center" />;
}
