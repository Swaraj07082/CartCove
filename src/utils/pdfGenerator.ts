import { OrderWithProducts } from "@/app/dashboard/transactions/page";
import jsPDF from "jspdf";

export const generatePDF = (order : any) => {
    if (!order) {
        return null // Handle the case where order is null
      }
    
  const doc = new jsPDF();
  console.log(order)

//   // Example content for the PDF
//   doc.text("Orders Summary", 10, 10);
//   order.forEach((order, index) => {
//     const y = 20 + index * 10;
//     doc.text(`Order ID: ${order.id}`, 10, y);
//     doc.text(`Email: ${order.email}`, 10, y + 5);
//     doc.text(`Address: ${order.Address}, ${order.City}, ${order.State}, ${order.Pincode}`, 10, y + 10);
//     doc.text(`Total Amount: $${calculateSubtotal(order)}`, 10, y + 15);
//     doc.text(`Created At: ${new Date(order.createdAt).toLocaleString()}`, 10, y + 20);
//   });

//   doc.save("orders_summary.pdf");
};

// const calculateSubtotal = (order) => {
//   return order.OrderedProduct.reduce((acc, item) => {
//     return acc + item.product.price * item.quantity;
//   }, 0);
// };
