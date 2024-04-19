"use client"
/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useState} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Image from "next/image";


const Radio = () => {
	const [stations, setStations] = useState();
	const [item, setItem] = useState({codec: "MP3",country: "Bangladesh",
		countrycode: "BD",favicon:"https://dhakafm904.com/assets/images/logo.png",homepage: "http://www.jago.fm/",language:"bengali",languagecodes:"bn",
		name: "Jago FM 94.4",url: "http://128.199.184.111:12496/stream",
		url_resolved: "http://128.199.184.111:12496/stream",votes:21716});
	// console.log(stations);
    
	// let url1 = 'http://de1.api.radio-browser.info/json/countries'; 
	let urla = 'https://de1.api.radio-browser.info/'
	let urlp = 'http://de1.api.radio-browser.info/json/stations';
	let url = 'https://de1.api.radio-browser.info/json/stations/search?limit=50&countrycode=BD&hidebroken=true&order=clickcount&reverse=true';

	fetch(url) 
	.then(response => response.json()) 
	.then(data => {
		setStations(data); 
	}) 
	.catch(error => console.error(error)); 

	// useEffect(() => {
	// 	// fetch data
	// 	const dataFetch = async () => {
	// 	  const data = await (
	// 		await fetch(
	// 		  url
	// 		)
	// 	  ).json();
	
	// 	  // set state when the data received
	// 	  setStations(data);
	// 	};
	
	// 	dataFetch();
	//   }, []);
	
   const RadioPlay = (e) =>{
	{stations && stations?.map(station=>{
		if (station.url==e) {
			setItem(station);
		} 
	})}
   }
	return (
		<div>
			<div class='bg-gray-500'>
			<h1 class="mt-6 text-ls text-center font-medium text-black-900">Radio Play Now</h1>
			</div>
			<div class="flex flex-col m-5 rounded-lg bg-white text-center shadow">
			<div class="-mt-px flex divide-x divide-gray-200 ">
				<div class="flex w-0 flex-1">
			
				<img class="mx-auto h-32 w-32 flex-shrink-0 rounded-full" 
				alt='https://dhakafm904.com/assets/images/logo.png' src={item?.favicon} cap={item.toString()}/>

				</div>
				<div class="flex w-0 flex-1">
				<h3 class="mt-6 text-md text-center font-medium text-gray-900">{item?.name}</h3>
				</div>
				<div class="-ml-px flex w-0 flex-1">
				<div class="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
				<audio controls autoPlay src={item?.url_resolved ? item?.url_resolved : "http://128.199.184.111:12496/stream"} ></audio>
				</div>
				</div>
			</div>
			</div>
			<div class='bg-gray-500'>
			<h1 class="mt-6 text-md text-center font-medium text-black-900">Radio Play List </h1>
			</div>
		<ul role="list" class="grid grid-cols-1 gap-6 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			{stations && stations.map((station, index) => (

		<li key={index} class="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg shadow-2xl bg-slate-400 text-center shadow">
			<div>
			<div class="-mt-px flex divide-x divide-gray-200 ">
				<div class="flex w-0 flex-1">
			
				<img class="mx-auto h-32 w-32 flex-shrink-0 rounded-full" 
				alt='https://dhakafm904.com/assets/images/logo.png' src={station.favicon} cap={item.toString()}/>

				</div>
				<div class="flex w-0 flex-1">
				<h3 class="mt-6 text-sm font-medium text-gray-900">{station.name}</h3>
				</div>
				<div class="-ml-px flex w-0 flex-1">
				<div class="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
				<button class='text-2xl text-center bg-blue-500 shadow-lg shadow-blue-500/50 hover:bg-teal-500 focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-80'
				 onClick={()=>RadioPlay(station.url)}>Play</button>
				</div>
				</div>
			</div>
			</div>
		</li>
		))}
		</ul>

	</div>
	);
};

export default Radio;