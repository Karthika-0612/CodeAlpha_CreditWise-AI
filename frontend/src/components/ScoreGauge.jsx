export default function ScoreGauge({ score }) {
  return (
    <div className="text-center">
      <div className="text-5xl font-bold text-blue-600">{score}</div>

      <p className="text-gray-600">Credit Score</p>
    </div>
  );
}
