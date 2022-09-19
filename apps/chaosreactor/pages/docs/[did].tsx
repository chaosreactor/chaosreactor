import { useRouter } from 'next/router';

const Doc = () => {
  const router = useRouter();
  const { did } = router.query;

  return <p>Doc: {did}</p>;
};

export default Doc;
