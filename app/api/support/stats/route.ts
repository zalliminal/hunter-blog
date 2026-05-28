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

    // دریافت آمار کلی
    const totalResponse = await fetch(`${DARAMET_BASE_URL}/api/v2/Total`, {
      headers: {
        "Authorization": DARAMET_API_TOKEN,
        "Content-Type": "application/json",
      },
      next: { revalidate: 30 },
    });

    // دریافت اطلاعات هدف
    const goalResponse = await fetch(`${DARAMET_BASE_URL}/api/v2/Goal`, {
      headers: {
        "Authorization": DARAMET_API_TOKEN,
        "Content-Type": "application/json",
      },
      next: { revalidate: 30 },
    });

    if (!totalResponse.ok) {
      throw new Error("Failed to fetch total stats");
    }

    const totalData = await totalResponse.json();
    
    let goalData = null;
    if (goalResponse.ok) {
      const goalArray = await goalResponse.json();
      goalData = Array.isArray(goalArray) && goalArray.length > 0 ? goalArray[0] : null;
    }

    // ✅ مقادیر عددی با default منطقی
    const totalAmount = Number(totalData?.total_amount_tomans) || 0;     // جمع کل دونیت‌ها
    const totalCount = Number(totalData?.total_donates) || 0;            // تعداد کل دونیت‌ها
    const goalAmount = Number(goalData?.campaign_goal) || 50000000;      // مبلغ هدف
    const goalProgress = Number(goalData?.campaign_earn) || 0;           // مبلغ جمع‌شده از هدف

    const stats = {
      totalAmount: totalAmount,
      totalCount: totalCount,
      goalAmount: goalAmount,
      goalProgress: goalProgress,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching support stats:", error);
    return NextResponse.json(
      {
        totalAmount: 0,
        totalCount: 0,
        goalAmount: 50000000,
        goalProgress: 0,
      },
      { status: 200 }
    );
  }
}
