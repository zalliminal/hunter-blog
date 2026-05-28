// app/api/support/latest/route.js
import { NextResponse } from "next/server";

const DARAMET_API_TOKEN = process.env.DARAMET_API_TOKEN;
const DARAMET_BASE_URL = "https://daramet.com";

export async function GET() {
  try {
    if (!DARAMET_API_TOKEN) {
      return NextResponse.json(
        { error: "API token not configured" },
        { status: 500 }
      );
    }

    // دریافت آخرین دونیت‌ها با صفحه‌بندی
    const allDonatesResponse = await fetch(
      `${DARAMET_BASE_URL}/api/v2/Donates/All`,
      {
        method: 'POST',
        headers: {
          "Authorization": DARAMET_API_TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ page: 1 }),
        next: { revalidate: 60 },
      }
    );

    let donationsData = [];

    if (allDonatesResponse.ok) {
      donationsData = await allDonatesResponse.json();
    }

    // ✅ تبدیل ساختار داده‌ها و مرتب‌سازی
    const supporters = donationsData
      .map((donation) => {
        const donatorData = donation.donator_data || {};
        
        // ✅ تبدیل timestamp به تاریخ ISO
        const timestamp = donatorData.timestamp 
          ? new Date(donatorData.timestamp * 1000).toISOString()
          : new Date().toISOString();

        // ✅ استخراج صحیح نام حامی و تشخیص ناشناس بودن
        const donatorInfo = donation.donator;
        let name = "ناشناس";
        let isAnonymous = true;

        if (typeof donatorInfo === "object" && donatorInfo !== null) {
          name = donatorInfo.donator_name || "ناشناس";
          isAnonymous = !donatorInfo.donator_name;
        } else if (typeof donatorInfo === "string") {
          name = donatorInfo || "ناشناس";
          isAnonymous = name === "ناشناس";
        }

        return {
          id: donatorData.id?.toString() || Math.random().toString(),
          name: name,
          amount: donatorData.amount || 0,
          message: donatorData.message || "",
          timestamp: timestamp,
          isAnonymous: isAnonymous,
        };
      })
      .sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
      .slice(0, 20);

    return NextResponse.json(supporters);
  } catch (error) {
    console.error("Error fetching latest supporters:", error);
    return NextResponse.json([], { status: 200 });
  }
}
