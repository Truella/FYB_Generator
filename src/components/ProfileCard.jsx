import html2canvas from "html2canvas";

const ProfileCard = ({
	name,
	nickname,
	relationship,
	crush,
	hobbies,
	favCourse,
	challengingCourse,
	bestLevel,
	worstLevel,
	alternativeCareer,
	quote,
	state,
	advice,
	birthday,
	imageUrl,
}) => {
	const handleDownload = async () => {
		const card = document.getElementById(name);
		const button = card.querySelector(".download-btn");
		button.style.display = "none"; // hide the button before capture

		const canvas = await html2canvas(card, {
			useCORS: true,
			backgroundColor: "#f5f5f5",
			scale: 2, // increases image quality
		});

		button.style.display = "block"; // restore after capture

		const link = document.createElement("a");
		link.download = `${name}.png`;
		link.href = canvas.toDataURL("image/png");
		link.click();
	};

	return (
		<div
			id={name}
			style={{
				backgroundImage: "url('/grass_bg.jpg')",
				backgroundSize: "cover",
				borderColor: "#e5e7eb",
			}}
			className="relative w-[1024px] h-[1280px] mx-auto rounded-2xl overflow-hidden shadow-2xl border"
		>
			{/* Header */}
			<div
				style={{ color: "#ffffff" }}
				className="py-3 px-4 flex justify-between items-center"
			>
				<div>
					<h2 className="font-bold uppercase tracking-wider text-sm">
						Architecture Students Association
					</h2>
					<p className="text-[11px] font-semibold">YABATECH</p>
				</div>
				<div className="text-right text-[11px]">
					<p className="font-bold">HND</p>
					<p>Renaissance Set ’25</p>
				</div>
			</div>

			{/* Image + Info Section */}
			<div className="flex gap-3 p-4 border">
				<div className="w-[90px] h-[90px] rounded-xl overflow-hidden shadow-md">
					<img
						src={imageUrl || "/default-avatar.jpg"}
						alt={name}
						className="object-cover w-full h-full"
					/>
				</div>
				<div className="flex flex-col justify-center">
					<h2 style={{ color: "#111827" }} className="text-xl font-bold">
						{name}
					</h2>
					<p style={{ color: "#4b5563" }} className="text-sm italic">
						FYB of the day
					</p>
				</div>
			</div>

			{/* Info Section */}
			<div className="p-4 text-[13px] space-y-2 bg-[linear-gradient(to_bottom_right,#d7e4d0,#e7ebe6,#f2f2f2)]">
				{[
					["Birthday", birthday],
					["Nickname", nickname],
					["Relationship Status", relationship],
					["School Crush", crush],
					["Hobbies / Skills", hobbies],
					["Fav Course", favCourse],
					["Most Challenging Course", challengingCourse],
					["Best Level in YCT", bestLevel],
					["Worst Level in YCT", worstLevel],
					["If not Architecture, what?", alternativeCareer],
					["Best Quote", quote],
					["State of Origin", state],
					["Advice to the Youngies", advice],
				].map(([title, value], index) => (
					<p key={index} className="flex flex-col">
						<span className="font-[Russo_One] uppercase tracking-[2px] text-[#ff7a00]">
							<b>{title}</b>
						</span>
						<span className="font-[Exo_2] text-[#000000] uppercase text-base">
							{value}
						</span>
					</p>
				))}
			</div>

			{/* Download button (not included in image) */}
			<div style={{ backgroundColor: "#111827" }} className="text-center py-3">
				<button
					onClick={handleDownload}
					style={{ backgroundColor: "#f97316" }}
					className="download-btn hover:brightness-110 text-white font-semibold py-2 px-5 rounded-lg text-sm"
				>
					Download Image
				</button>
			</div>
		</div>
	);
};

export default ProfileCard;
