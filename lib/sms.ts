// lib/sms.ts

interface SMSResponse {
  status: number;
  message: string;
  data?: {
    packId: string;
    messageIds: (number | null)[];
    cost: number;
  };
}

export async function sendWelcomeSMS(phone: string): Promise<boolean> {
  const apiKey = process.env.SMS_IR_API_KEY;
  const lineNumber = process.env.SMS_IR_LINE_NUMBER;

  if (!apiKey || !lineNumber) {
    console.error('SMS_IR_API_KEY or SMS_IR_LINE_NUMBER is missing');
    return false;
  }

  // متن جدید (کوتاه‌تر)
  const message = `حله! شماره‌ت رو نوشتیم.
به خانواده کاولبز خوش اومدی رفیق.`;

  try {
    const response = await fetch('https://api.sms.ir/v1/send/bulk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({
        lineNumber: Number(lineNumber),
        messageText: message,
        mobiles: [phone],
      }),
    });

    const result: SMSResponse = await response.json();

    if (result.status === 1) {
      console.log(`✅ پیامک با موفقیت به ${phone} ارسال شد. PackId: ${result.data?.packId}`);
      return true;
    } else {
      console.error(`❌ خطا در ارسال پیامک: ${result.message} (کد ${result.status})`);
      return false;
    }
  } catch (error) {
    console.error('❌ خطا در ارتباط با سرور پیامکی:', error);
    return false;
  }
}