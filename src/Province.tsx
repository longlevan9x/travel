import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react';
import {ReactComponent as Vietnam} from './vietnam-map-province.svg'
import {useSelector} from "react-redux";
import {RootState} from "./store";
import {REGION_ID} from "./constant";

const ProVinceComponent = () => {
    const svgRef = useRef(null);
    const isClick = useRef(true);
    const activeClass = 'province-active';
    let elementRegions: any = useRef([]);
    let elementProvinces: any = useRef([]);
    const [province, setProvince]: [any, Dispatch<SetStateAction<any>>] = useState(null);
    const regionState = useSelector((state: RootState) => state.region);
    const region = regionState.region;

    const handleElementClick = (element: any) => {
        elementProvinces.forEach((element: any) => {
            element.classList.remove(activeClass)
        });

        const classNames = element.getAttribute('class');
        if (!classNames.includes(activeClass)) {
            element.classList.add(activeClass);
        } else {
            element.classList.remove(activeClass);
        }
    };

    const getElementId = (element: any) => {
        return element.getAttribute('id');
    }
    const isEqualId = (element: any): boolean => {
        const elementId = getElementId(element);
        return region?.id === elementId;
    }

    useEffect(() => {
        isClick.current = false;
        const svgElement: any = svgRef.current;
        elementRegions = svgElement.querySelectorAll('.regions') as NodeList;
        elementProvinces = svgElement.querySelectorAll(`#${region?.id} .province`) as NodeList;

        elementRegions.forEach((element: any) => {
            if (!isEqualId(element)) {
                element.classList.add('hidden');
            } else {
                element.classList.remove('hidden');

                const transforms = {
                    [REGION_ID.NORTHERN_MIDLAND_AND_MOUNTAINOUS_REGION]: 'scale(2, 2) translateY(200px)',
                    [REGION_ID.RED_RIVER_DELTA_AND_NORTH_EAST_COAST]: 'scale(3, 3) translateX(-250px) translateY(0px)',
                    [REGION_ID.NORTH_CENTRAL]: 'scale(2, 2) translateY(-100px) translateX(-100px)',
                    [REGION_ID.SOUTH_CENTRAL_COAST]: 'scale(1.7, 1.7) translateY(-400px) translateX(-410px)',
                    [REGION_ID.CENTRAL_HIGHLANDS]: 'scale(2, 2) translateY(-500px) translateX(-300px)',
                    [REGION_ID.SOUTH_EAST]: 'scale(3, 3) translateY(-750px) translateX(-300px)',
                    [REGION_ID.MEKONG_RIVER_DELTA]: 'scale(3, 3) translateY(-850px) translateX(-150px)',
                }

                element.style.transform = transforms[region.id];
            }
        });

        elementProvinces.forEach((element: any) => {
            element.addEventListener('click', () => handleElementClick(element));
        });

        // Cleanup: Loại bỏ sự kiện khi component unmount
        return () => {
            elementRegions.forEach((element: any) => {
                element.removeEventListener('click', () => handleElementClick(element));
            });
        };
    }, [region]);


    return (
        <>
            <div className=" w-full h-full bg-cover"
                 style={{backgroundImage: `url('/hanoi.jpg')`}}
            >
                <div className="mx-auto grid max-w-2xl lg:mx-0 lg:max-w-none lg:grid-cols-3 ">
                    <div className="flex justify-end items-center bg-opacity-30 bg-indigo-100  ">
                        {region && <>
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
                        </>}
                    </div>
                    <div className="w-full flex  items-center col-span-2  bg-opacity-30 bg-indigo-100">
                        <Vietnam className=" h-screen" ref={svgRef}></Vietnam>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProVinceComponent;
