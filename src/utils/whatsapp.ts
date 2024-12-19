export const sendWhatsAppMessage = (phoneNumber: string, message: string): void => {
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
    // Use direct navigation for mobile browsers
    location.href = url;
  } else {
    // Open a new tab for desktop browsers
    window.open(url, '_blank');
  }
};

export const createDepositMessage = (customerName: string, itemName: string, weight: number): string => {
  return `Hello ${customerName}, your ${itemName} (${weight}g) has been received for repair at Golden Jewelry. We'll notify you when it's ready. Thank you!`;
};

export const createCompletionMessage = (customerName: string, itemName: string): string => {
  return `Hello ${customerName}, your ${itemName} repair is complete! You can collect it from our store during business hours. Thank you for choosing Golden Jewelry!`;
};
