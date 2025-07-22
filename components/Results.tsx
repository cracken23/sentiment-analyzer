import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ResultsProps {
  results: {
    sentiment: string;
    score: number;
    magnitude: number;
  } | null;
}

const Results = ({ results }: ResultsProps) => {
  if (!results) {
    return null;
  }

  return (
    <Card className='bg-yellow-400 dark:bg-yellow-900'>
      <CardHeader>
        <CardTitle>Results</CardTitle>
      </CardHeader>
      <CardContent>
        <h3>Sentiment : {results.sentiment}</h3>
        <h3>Score : {results.score}</h3>
        <h3>Magnitude : {results.magnitude}</h3>
      </CardContent>
    </Card>
  );
};

export default Results;
