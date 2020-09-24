import { useRouter } from 'next/router'

const PortfolioDetail = () => {

    const router = useRouter();
    const id = router.query.id;
    
    return (
        <div>det pa {id}</div>
    )
};

export default PortfolioDetail;
