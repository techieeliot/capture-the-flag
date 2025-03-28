import "./styles.css";
import { useFlagFetcher, useTypeWriter } from "./hooks";

export default function App() {
  const flagInput = useFlagFetcher();
  const flagOutput = useTypeWriter(flagInput);
  
  return (
    <div className="App">
      <ul>
        {flagOutput ? flagOutput.map((char, index) => (
          <li key={index}>{char}</li>
        )) : null}
      </ul>
    </div>
  );
}
