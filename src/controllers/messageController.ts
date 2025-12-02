import { Request, Response } from "express";
import { sendMessage } from "../services/cloud.service";
import { sendLogToWhodbok } from "../services/whodbok.service";
import logger from "../utils/logger";

export async function receiveMessage(req: Request, res: Response) {
  try {
    const entry = req.body.entry?.[0];
    const changes = entry?.changes?.[0];
    const message = changes?.value?.messages?.[0];

    if (!message) {
      return res.sendStatus(200);
    }

    const from = message.from;
    const text = message.text?.body || "";

    logger.info(`Recebida mensagem de ${from}: ${text}`);
    await sendLogToWhodbok({ from, text });

    if (text.toLowerCase() === "menu") {
      await sendMessage(from, "Bem-vindo ao Menu Uchiha! Digite uma opção.");
    } else {
      await sendMessage(from, `Você disse: ${text}`);
    }

    return res.sendStatus(200);
  } catch (err: any) {
    logger.error(`Erro ao tratar mensagem: ${err.message}`);
    return res.sendStatus(500);
  }
}
