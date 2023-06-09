import { makeSentenceObj } from "../components/ExampleSentences";
import axios from "axios";

export default async function fetchExampleSentences(
  userSentence,
  selectedWords,
  dispatch
) {
  const wordsToReplace = selectedWords
    .map((item) => `"${item.word.trim()}"`)
    .join(", ");

  const prompt = `Generate five example sentences that follow the same sentence structure of "${userSentence}" and replace ${wordsToReplace} with different words.`;

  const response = await axios.post("http://localhost:5000/", {
    prompt,
  });
  const data = response.data;
  const sentences = data.choices[0]?.text.trim().split("\n");
  makeSentenceObj(sentences, dispatch);
}
