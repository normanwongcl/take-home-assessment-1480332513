'use client';

import { useSearchParams } from 'next/navigation';

import { LineChart } from '@/components/Chart/LineChart';
import { AverageInfoGrid } from '@/components/Grid/AverageInfoGrid';
import { TimeSelectionMenu } from '@/components/Input/TimeSelectionMenu';
import { HistoricalListing } from '@/components/Table/HistoricalListing';
import { useCryptoHistoricalData } from '@/hooks/use-crypto-price-data';
const Home = () => {
  const searchParams = useSearchParams();
  const { cryptoHistoricalPrice, isLoading, error, setQueryString } =
    useCryptoHistoricalData('bitcoin', searchParams.toString());
  if (isLoading) {
    return (
      <div className="sm:pt-8 lg:pt-8">
        <div className="mx-auto max-w-3xl">
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="sm:pt-8 lg:pt-8">
        <div className="mx-auto max-w-3xl">
          <div>Error: {error.message}</div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="sm:pt-8 lg:pt-8">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-t-lg bg-white px-4 py-6 sm:px-6 lg:px-8">
            <TimeSelectionMenu setQueryString={setQueryString} />
          </div>
        </div>
        <div className="mx-auto max-w-3xl">
          <div className="rounded-lg bg-white lg:px-8">
            <AverageInfoGrid {...cryptoHistoricalPrice} />
          </div>
          <div className="rounded-b-lg bg-white px-4 py-6 sm:px-6 lg:px-8">
            <LineChart {...cryptoHistoricalPrice} />
          </div>
        </div>
        <div className="mx-auto mb-8 mt-4 max-w-3xl">
          <HistoricalListing {...cryptoHistoricalPrice} />
        </div>
      </div>
    </>
  );
};
export default Home;
