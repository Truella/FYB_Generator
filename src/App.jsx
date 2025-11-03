import React from 'react'
import IDCardGenerator from './components/Bulk_Generator'

export default function App() {
  return (
    <div>
      <IDCardGenerator/>
      
    </div>
  )
}

/* import ProfileCard from "./components/ProfileCard";

function App() {
	const data = [
		{
			name: "Raheem Jamiu",
			nickname: "Cypher",
			relationship: "Married",
			crush: "Dolapo",
			hobbies: "Sporty Bet",
			favCourse: "Const Drawing",
			challengingCourse: "MTH",
			bestLevel: "ND2",
			worstLevel: "HND2",
			alternativeCareer: "Mechanic",
			quote: "Alhamdulilah",
			state: "Lagos",
			advice: "Don't quit",
			birthday: "Sept 12",
			imageUrl: "/raheem.jpg",
		},
	];

	return (
		<div className="min-h-screen bg-gray-100 flex flex-wrap justify-center items-start gap-6 p-6">
			{data.map((person, i) => (
				<ProfileCard key={i} {...person} />
			))}
		</div>
	);
}
*/