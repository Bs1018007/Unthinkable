import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const analyzeCode = async (code, language) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `You are an expert code reviewer. Analyze the following ${language} code for:

1. Code structure and organization
2. Readability and maintainability
3. Best practices adherence
4. Potential bugs and security issues
5. Performance optimizations
6. Code smell detection

Provide a detailed review report with:
- Overall assessment
- Specific issues found (with line references if possible)
- Improvement suggestions
- Code quality score (0-100)

Code to review:
\`\`\`${language}
${code}
\`\`\`

Format your response in a clear, structured manner.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const reviewText = response.text();

    return {
      success: true,
      review: reviewText,
    };

  } catch (error) {
    console.error('AI Analysis Error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};
