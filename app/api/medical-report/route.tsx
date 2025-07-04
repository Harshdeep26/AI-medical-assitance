import { openai } from "@/config/OpenAiModel";
import { AIDoctorAgents } from "@/shared/list";
import { NextRequest } from "next/server";

const REPORT_GEN_PROMPT= `You are an AI Medical Voice Agent tha just finshed a voice conversation with a user.Based on teh conversation, generate a medical report that includes the following sections: 
1. sessionId: a unique session identifier
2. agent: the medical specialist name(e.g., "General Physician", "Cardiologist", etc.)
3. user: name of the patient or "Anonymous" if not provided
4. tiemstamp: current date and time in ISO format
5. chiefComplaint: one-sentence summary of the main health concern
6. summary: a 2-3 sentence summary of the conversation, symptoms, and recommendations
7.symptoms: a list of symptoms mentioned by the user
8. durability: how long the user has been experienced the symptoms
9. severity: mild,moderate, or severe
10. medicationsMentioned: list of any medications mentioned
11. recommendations: list of AI suggestions (e.g., rest,see a docotr)
return the report in JSON format only, with no additional text or formatting.
{
    "sessionId":"string",
    "agent": "string",
    "user": "string",
    "timestamp": "ISO Date string",
    "chiefComplaint": "string",
    "summary": "string",
    "symptoms": ["symptom1","symptom2"],
    "duration": "string",
    "severity": "string",
    "medicationsMentioned": ["med1","med2"],
    "recommendations": ["rec1","rec2"]
}
    Only include valid fields. Respond with nothing else.`;

export async function POST(req: NextRequest) {
    const { sessionId, sessionDetail, messages } = await req.json();

    try {
        const completion = await openai.chat.completions.create({
            // model: "google/gemini-2.5-flash-preview-05-20",
            model: "deepseek/deepseek-r1-0528:free",
            messages: [
                // { role: "system", content:  },
                // { role: "user", content: "user Notes/symptoms:" + notes + ", Depends on user notes and symptoms, please suggust list of doctors, Return object in JSON only " }
                // {role: "user", content: "User Notes/Symptoms: " + notes +
                //         ". Based on the symptoms, return ONLY a JSON array of suggested doctors. Each doctor should have name, specialty, and description."}

            ],
        });

        const rawResp = completion.choices[0].message;
        //@ts-ignore
        const resp = rawResp.content.trim().replace('```json', '').replace('```', '');
        const JSONResp = JSON.parse(resp);
    }
    catch (e) {

    }

}