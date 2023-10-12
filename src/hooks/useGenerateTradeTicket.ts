import React, { useEffect, useState } from "react";
import { IConfirmOrderResponse } from "../redux/services/reedemables/interfaces/confirm-order.interface";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
export const useGenerateTradeTicket = (trade: IConfirmOrderResponse) => {
  const [ticketLayout, setTicketLayout] = useState("");

  const printToFile = async () => {
    const { uri } = await Print.printToFileAsync({ html: ticketLayout });
    console.log("File has been saved to:", uri);
    await shareAsync(uri, {
      UTI: ".pdf",
      mimeType: "application/pdf",
    });
  };

  useEffect(() => {
    setTicketLayout(
      `
  <html>
  <head>
      <style>
          .invoice {
              font-family: Arial, sans-serif;
              width: 80%;
              margin: 0 auto;
              text-align: left;
          }
  
          .header {
              background-color: #F50057;
              color: #fff;
              padding: 20px;
          }
  
          .header h1 {
              margin: 0;
          }
  
          .info {
              margin-top: 20px;
          }
  
          .info p {
              margin: 5px 0;
          }
  
          .item {
              border: 1px solid #ddd;
              margin: 10px 0;
              padding: 10px;
          }
  
          .item h2 {
              margin: 0;
          }
      </style>
  </head>
  <body>
      <div class="invoice">
          <div class="header">
              <h1>Ticket de canje</h1>
              <img
      src="../../../../../../assets/logo.png"
      style="width: 90vw;" />
          </div>
          <div class="info">
              <p><strong>Fecha de creación:</strong>${new Date(
                trade?.createdAt
              ).toLocaleString()}</p>
              <p><strong>ID de canje:</strong> ${trade?.id}</p>
          </div>
          <div class="item">
              <h2>Artículo:</h2>
              <p><strong>ID del artículo:</strong> ${trade?.redeemedItem.id}</p>
              <p><strong>Nombre del artículo:</strong> ${
                trade?.redeemedItem.name
              }</p>
          </div>
          <div class="info">
              <p><strong>Usuario:</strong></p>
              <p><strong>ID de usuario:</strong> ${trade?.user.id}</p>
              <p><strong>Nombre del usuario:</strong> ${trade?.user.name}</p>
              <p><strong>Apellido del usuario:</strong> ${
                trade?.user.lastname
              }</p>
          </div>
      </div>
  </body>
  </html>
`
    );
  });

  return {
    printToFile,
  };
};
