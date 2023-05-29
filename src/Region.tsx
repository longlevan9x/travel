import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react';
import {ReactComponent as Vietnam} from './vietnam-map.svg'
import {useDispatch} from "react-redux";
import { setRegion as setRegionRedux } from './regionSlice'

const regions = [
    {
        id: 'default',
        name: 'VIỆT NAM',
        description: 'Việt Nam là một đất nước sở hữu nhiều cảnh đẹp. Con người Việt Nam thật dễ mến. Việt Nam có rất nhiều món ăn ngon. Việt Nam mang nét đẹp truyền thống pha lẫn hiện đại. Việt Nam là một trong những quốc gia đáng sống nhất thế giới'
    },
    {
        id: 'northern_midland_and_mountainous_region',
        name: 'VÙNG TRUNG DU VÀ MIỀN NÚI BẮC BỘ',
        description: 'Vùng Trung du và miền núi Bắc Bộ bao gồm vùng núi Tây Bắc và Đông Bắc tạo nên địa hình hiểm trở, núi non hùng vĩ, điển hình là đỉnh Phan-xi-păng ở độ cao 3.143m được ví như “nóc nhà của Đông Dương”. và nhiều đỉnh núi khác ở độ cao khoảng 3.000m so với mực nước biển.',
    },
    {
        id: 'red_river_delta_and_north_east_coast',
        name: 'ĐỒNG BẰNG SÔNG HỒNG VÀ DUYÊN HẢI ĐÔNG BẮC',
        description: 'Đồng bằng sông Hồng và duyên hải Đông Bắc do phù sa của hai con sông lớn là Hồng và Thái Bình tạo nên, tạo thành một trong hai vựa lúa lớn nhất của Việt Nam. Đây là vùng tập trung nhiều tài nguyên du lịch tạo điều kiện thuận lợi để phát triển đa dạng các loại hình du lịch như biển - đảo, văn hóa - tâm linh, du lịch cộng đồng, du lịch sinh thái, du lịch thể thao mạo hiểm, tham quan đồng quê...',
    },
    {
        id: 'north_central',
        name: 'BẮC TRUNG BỘ',
        description: 'Bắc Trung Bộ nằm trên dải đất hẹp nhất của Việt Nam, nằm giữa dãy Trường Sơn và biển Đông. Bắc Trung Bộ có nhiều điều kiện thuận lợi để phát triển du lịch với những bãi biển đẹp; nhiều cảnh quan thiên nhiên đặc sắc; khu bảo tồn thiên nhiên và vườn quốc gia; di tích lịch sử, văn hóa, kiến trúc có giá trị; nhiều lễ hội cụ thể.',
    },
    {
        id: 'south_central_coast',
        name: 'DUYÊN HẢI NAM TRUNG BỘ',
        description: 'Duyên hải Nam Trung Bộ có địa hình phức tạp giữa đồi núi, rừng và biển tạo nên cảnh quan hùng vĩ và bãi biển đẹp. Đây là điều kiện thuận lợi để phát triển du lịch, nhất là du lịch biển đảo.',
    },
    {
        id: 'central_highlands',
        name: 'TÂY NGUYÊN',
        description: 'Nằm trong Trục Xuyên Á, phía Tây giáp Nam Lào, Đông Bắc Campuchia và nối liền với các tỉnh có cảng biển lớn ở phía Đông, Tây Nguyên có nhiều tiềm năng, lợi thế để thu hút đầu tư phát triển kinh tế - xã hội. Với hai mùa mưa - khô rõ rệt cùng nguồn tài nguyên thiên nhiên đa dạng, Tây Nguyên sở hữu những điều kiện thuận lợi để phát triển nhiều loại hình du lịch như du lịch sinh thái, du lịch mạo hiểm...',
    },
    {
        id: 'south_east',
        name: 'ĐÔNG NAM BỘ',
        description: 'Đông Nam Bộ nằm gần đồng bằng sông Cửu Long và cũng là cửa ngõ phía Tây đi Campuchia, Thái Lan, Malaysia qua đường xuyên Á và là cửa ngõ phía Đông đi các cảng Sài Gòn, Bà Rịa - Vũng Tàu, Thị Vải. Vì vậy vùng đất này có vai trò quan trọng trong phát triển kinh tế - xã hội của đất nước, đặc biệt là du lịch với các loại hình du lịch về nguồn, du lịch nghỉ dưỡng, du lịch biển, du lịch sinh thái…',
    },
    {
        id: 'mekong_river_delta',
        name: 'ĐỒNG BẰNG SÔNG CỬU LONG',
        description: 'Nằm liền kề Thành phố Hồ Chí Minh, Đồng bằng sông Cửu Long là vùng kinh tế - văn hóa đặc biệt quan trọng của Nam Bộ. Phù sa màu mỡ của sông Cửu Long với 2 nhánh chính là sông Tiền và sông Hậu, hệ thống kênh rạch cùng với rừng và biển - đảo tạo nên hệ sinh thái đa dạng và cảnh quan đặc sắc cho ĐBSCL.',
    },
]


const RegionComponent = () => {
    const [headerHeight, setHeaderHeight] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        const headerElement = document.getElementById('header');
        if (headerElement) {
            const headerHeight = headerElement.clientHeight;
            setHeaderHeight(headerHeight);
        }
    }, []);

    const svgRef = useRef(null);
    const isClick = useRef(true);
    const regionActiveClass = 'region-active';
    let elementRegions: any = useRef([]);
    const [region, setRegion]: [any, Dispatch<SetStateAction<any>>] = useState(regions[0]);

    const handleElementClick = (element: any) => {
        elementRegions.forEach((element: any) => {
            element.classList.remove(regionActiveClass)
        });

        const elementId = element.getAttribute('id');

        const _region = regions.find(r => r.id === elementId.trim());
        setRegion(_region);

        const classNames = element.getAttribute('class');
        if (!classNames.includes(regionActiveClass)) {
            element.classList.add(regionActiveClass);
        } else {
            element.classList.remove(regionActiveClass);
        }

        dispatch(setRegionRedux(_region));
    };

    useEffect(() => {
        if (isClick.current) {
            dispatch(setRegionRedux(regions[0]));

            isClick.current = false;
            const svgElement: any = svgRef.current;
            elementRegions = svgElement.querySelectorAll('.regions') as [];
            elementRegions.forEach((element: any) => {
                element.addEventListener('click', () => handleElementClick(element));
            });

            // Cleanup: Loại bỏ sự kiện khi component unmount
            return () => {
                elementRegions.forEach((element: any) => {
                    element.removeEventListener('click', () => handleElementClick(element));
                });
            };
        }
    }, []);


    return (
        <>
            <div className=" w-full h-full bg-cover"
                 style={{backgroundImage: `url('/hanoi.jpg')`, marginTop: headerHeight + 'px'}}
            >
                <div className="mx-auto grid max-w-2xl lg:mx-0 lg:max-w-none lg:grid-cols-3 ">
                    <div className="flex justify-end items-center bg-opacity-30 bg-indigo-100  ">
                        <div className="lg:max-w-lg">
                            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
                                {region.name}
                            </p>
                            <p className="mt-6 text-3xl leading-8 text-neutral-950">
                                {region.description}
                            </p>
                            <div className="mt-5 text-center">
                                <button type="button"
                                        className="bg-transparent rounded-md px-2.5 py-1.5 text-lg font-semibold text-black ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:bg-opacity-60">
                                    Xem thêm
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex  items-center col-span-2 ">
                        <Vietnam className=" h-screen" ref={svgRef}></Vietnam>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegionComponent;
