import React from 'react';

/**
 * Standard utility to transform a phone number or URL into a clickable WhatsApp web/app link
 */
export function getWhatsAppUrl(value?: string, message: string = "Hello Sami, I visited your portfolio!"): string {
  if (!value) return '';
  const trimmed = value.trim();
  if (!trimmed) return '';
  
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  
  // Extract pure digits
  const digits = trimmed.replace(/\D/g, '');
  if (!digits) return '';
  
  const encodedMsg = encodeURIComponent(message);
  return `https://wa.me/${digits}?text=${encodedMsg}`;
}

/**
 * Official SVG icon for WhatsApp with high contrast & smooth scaling
 */
export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.677.15-.201.301-.778.978-.953 1.179-.176.2-.351.226-.652.075s-1.272-.469-2.423-1.496c-.896-.799-1.501-1.787-1.677-2.088-.176-.3-.019-.463.131-.613.136-.134.301-.351.451-.527.15-.176.2-.301.301-.501.1-.2.05-.376-.025-.526-.075-.15-.677-1.631-.928-2.233-.244-.587-.492-.507-.677-.517-.176-.01-.376-.01-.576-.01-.201 0-.527.075-.802.376-.276.301-1.053 1.028-1.053 2.508 0 1.48 1.078 2.909 1.229 3.109.15.2 2.122 3.24 5.141 4.544.718.31 1.279.496 1.716.635.721.229 1.377.197 1.896.12.577-.087 1.78-.727 2.03-1.429.251-.702.251-1.304.176-1.429-.075-.125-.276-.2-.576-.35zM12.04 2C6.51 2 2.02 6.49 2.02 12.02c0 1.94.55 3.75 1.51 5.29L2 22l4.82-1.49a9.98 9.98 0 0 0 5.22 1.47h.004c5.53 0 10.02-4.49 10.02-10.02C22.064 6.49 17.57 2 12.04 2zm0 18.324h-.003a8.31 8.31 0 0 1-4.237-1.16l-.304-.18-3.149.974.981-3.07-.197-.314a8.307 8.307 0 0 1-1.274-4.554c0-4.6 3.742-8.342 8.345-8.342 2.228 0 4.323.868 5.897 2.443a8.286 8.286 0 0 1 2.44 5.901c0 4.603-3.742 8.346-8.502 8.346z" />
  </svg>
);
