import React, { useState } from "react";
import html2canvas from "html2canvas";

const IDCardGenerator = () => {
	// Dummy data - will be replaced with Google Form data
	const [studentData, setStudentData] = useState({
		name: "RAHEEM JAMIU",
		birthday: "SEPT 12",
		nickname: "CYPHER",
		relationship: "MARRIED",
		schoolCrush: "DOLAPO",
		hobbies: "SPORTY BET",
		favCourse: "CONST DRAWING",
		challengingCourse: "MTH",
		bestLevel: "ND2",
		worstLevel: "HND2",
		alternativeCareer: "MECHANIC",
		quote: "ALHAMDULILAH",
		state: "LAGOS",
		advice: "DONT QUIT",
		set: "RENAISSANCE SET 25'",
		photo: null,
	});

	const handleDownload = async () => {
		const card = document.getElementById("id-card");
		const button = card.querySelector(".download-btn");
		button.style.display = "none"; // hide the button before capture

		const canvas = await html2canvas(card, {
			useCORS: true,
			backgroundColor: null,
			scale: 2, // increases image quality
		});

		button.style.display = "flex"; // restore after capture

		const link = document.createElement("a");
		link.download = `${studentData.name.replace(/\s+/g, "_")}_ID_Card.png`;
		link.href = canvas.toDataURL("image/png");
		link.click();
	};

	return (
		<div className="min-h-screen p-8" style={{ backgroundColor: "#f3f4f6" }}>
			<div className="max-w-4xl mx-auto">
				{/* Main Card Container */}
				<div
					id="id-card"
					className="relative w-full rounded-lg overflow-hidden shadow-2xl"
					style={{
						aspectRatio: "8.5/11",
						backgroundImage:
							"repeating-linear-gradient(0deg, #2d5016 0px, #2d5016 2px, #3d6b1f 2px, #3d6b1f 4px)",
					}}
				>
					{/* Header */}
					<div
						className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between"
						style={{
							background: "linear-gradient(to right, #16a34a, #4ade80)",
							color: "#ffffff",
						}}
					>
						<div className="flex items-center gap-4">
							{/* Logo placeholder */}
							<div
								className="w-16 h-16 rounded-full flex items-center justify-center"
								style={{ backgroundColor: "#ffffff" }}
							>
								<div
									className="w-12 h-12 rounded-full"
									style={{ backgroundColor: "#f97316" }}
								></div>
							</div>
							<div>
								<h1
									className="font-bold text-lg leading-tight"
									style={{
										fontFamily: "monospace",
										letterSpacing: "0.1em",
										color: "#ffffff",
									}}
								>
									ARCHITECTURE
									<br />
									STUDENTS
									<br />
									ASSOCIATION
									<br />
									YABATECH
								</h1>
							</div>
						</div>
						<div className="flex items-center gap-2">
							<span
								className="text-4xl font-bold"
								style={{ fontFamily: "monospace", color: "#ffffff" }}
							>
								HND
							</span>
							<svg
								className="w-12 h-12"
								viewBox="0 0 24 24"
								fill="none"
								stroke="#ffffff"
								strokeWidth="2"
							>
								<path d="M12 2L2 7v10c0 5.5 3.8 10 10 10s10-4.5 10-10V7L12 2z" />
							</svg>
							<div
								className="w-10 h-10 rounded-full"
								style={{ backgroundColor: "#ffffff" }}
							></div>
						</div>
					</div>

					{/* Main Content Area */}
					<div className="absolute top-28 left-0 right-0 bottom-0 flex">
						{/* Left Side - Photo and Name */}
						<div className="w-2/5 p-6 flex flex-col">
							{/* Ticket Stub Text */}
							<div className="mb-4">
								<p
									className="font-bold transform -rotate-90 origin-left text-sm"
									style={{
										fontFamily: "monospace",
										letterSpacing: "0.15em",
										color: "#ffffff",
									}}
								>
									FLY OF THE
								</p>
							</div>

							{/* Photo Container */}
							<div className="flex-1 flex items-center justify-center mb-4">
								<div className="relative">
									{/* Decorative background */}
									<div
										className="absolute inset-0 rounded-lg transform -rotate-2"
										style={{
											background:
												"linear-gradient(to bottom right, #ca8a04, #78350f)",
										}}
									></div>

									{/* Photo frame */}
									<div
										className="relative p-2 rounded-lg shadow-lg"
										style={{ backgroundColor: "#ffffff" }}
									>
										<div
											className="w-64 h-80 rounded flex items-center justify-center overflow-hidden"
											style={{ backgroundColor: "#e5e7eb" }}
										>
											{studentData.photo ? (
												<img
													src={studentData.photo}
													alt={studentData.name}
													className="w-full h-full object-cover"
												/>
											) : (
												<div
													className="w-full h-full flex items-center justify-center"
													style={{
														background:
															"linear-gradient(to bottom right, #d1d5db, #9ca3af)",
													}}
												>
													<span
														style={{ color: "#6b7280" }}
														className="text-sm"
													>
														PHOTO
													</span>
												</div>
											)}
										</div>
									</div>

									{/* Decorative plant */}
									<div
										className="absolute -right-8 top-1/4 w-20 h-32 rounded-t-full"
										style={{ backgroundColor: "#15803d", opacity: 0.5 }}
									></div>
								</div>
							</div>

							{/* Name Tag */}
							<div
								className="p-4 rounded-lg text-center"
								style={{ backgroundColor: "rgba(20, 83, 45, 0.7)" }}
							>
								<h2
									className="font-bold text-3xl"
									style={{
										fontFamily: "brush script mt, cursive",
										letterSpacing: "0.05em",
										color: "#ffffff",
									}}
								>
									{studentData.name}
								</h2>
							</div>

							{/* Bottom Ticket Stub */}
							<div className="mt-4">
								<p
									className="font-bold transform -rotate-90 origin-left text-sm"
									style={{
										fontFamily: "monospace",
										letterSpacing: "0.15em",
										color: "#ffffff",
									}}
								>
									ZANY
								</p>
							</div>
						</div>

						{/* Right Side - Information Panel */}
						<div
							className="w-3/5 p-6 rounded-l-3xl shadow-2xl"
							style={{
								background:
									"linear-gradient(to bottom right, #e5e7eb, #f3f4f6, #ffffff)",
							}}
						>
							<div className="space-y-2 text-sm">
								<InfoRow label="BIRTHDAY" value={studentData.birthday} />
								<InfoRow label="NICK NAME" value={studentData.nickname} />
								<InfoRow
									label="RELATIONSHIP STATUS"
									value={studentData.relationship}
								/>
								<InfoRow label="SCHOOL CRUSH" value={studentData.schoolCrush} />
								<InfoRow label="HOBBIES/SKILLS" value={studentData.hobbies} />
								<InfoRow label="FAV COURSE" value={studentData.favCourse} />
								<InfoRow
									label="MOST CHALLENGING COURSE"
									value={studentData.challengingCourse}
								/>
								<InfoRow
									label="BEST LEVEL IN YCT"
									value={studentData.bestLevel}
								/>
								<InfoRow
									label="WORST LEVEL IN YCT"
									value={studentData.worstLevel}
								/>
								<InfoRow
									label="IF NOT ARCHITECTURE,WHAT?"
									value={studentData.alternativeCareer}
								/>
								<InfoRow label="BEST QUOTE" value={studentData.quote} />
								<InfoRow label="STATE OF ORIGIN" value={studentData.state} />
								<InfoRow
									label="ADVISE TO THE YOUNGIES"
									value={studentData.advice}
								/>
							</div>
						</div>
					</div>

					{/* Footer */}
					<div className="absolute bottom-4 right-6">
						<h3
							className="font-bold text-3xl italic"
							style={{
								fontFamily: "brush script mt, cursive",
								color: "#ffffff",
							}}
						>
							{studentData.set}
						</h3>
					</div>

					{/* Download Button */}
					<div className="download-btn absolute bottom-4 left-4">
						<button
							onClick={handleDownload}
							className="font-bold py-2 px-6 rounded-lg shadow-lg transition-all flex items-center gap-2"
							style={{
								backgroundColor: "#f97316",
								color: "#ffffff",
							}}
							onMouseEnter={(e) => (e.target.style.backgroundColor = "#ea580c")}
							onMouseLeave={(e) => (e.target.style.backgroundColor = "#f97316")}
						>
							<svg
								className="w-5 h-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
								/>
							</svg>
							Download
						</button>
					</div>
				</div>

				{/* Data Input Form (for testing) */}
				<div
					className="mt-8 p-6 rounded-lg shadow-lg"
					style={{ backgroundColor: "#ffffff" }}
				>
					<h3 className="text-xl font-bold mb-4" style={{ color: "#111827" }}>
						Update Student Data (Testing)
					</h3>
					<div className="grid grid-cols-2 gap-4">
						<input
							type="text"
							placeholder="Name"
							value={studentData.name}
							onChange={(e) =>
								setStudentData({ ...studentData, name: e.target.value })
							}
							className="p-2 rounded"
							style={{ border: "1px solid #d1d5db" }}
						/>
						<input
							type="text"
							placeholder="Birthday"
							value={studentData.birthday}
							onChange={(e) =>
								setStudentData({ ...studentData, birthday: e.target.value })
							}
							className="p-2 rounded"
							style={{ border: "1px solid #d1d5db" }}
						/>
						<input
							type="text"
							placeholder="Nickname"
							value={studentData.nickname}
							onChange={(e) =>
								setStudentData({ ...studentData, nickname: e.target.value })
							}
							className="p-2 rounded"
							style={{ border: "1px solid #d1d5db" }}
						/>
						<input
							type="text"
							placeholder="State"
							value={studentData.state}
							onChange={(e) =>
								setStudentData({ ...studentData, state: e.target.value })
							}
							className="p-2 rounded"
							style={{ border: "1px solid #d1d5db" }}
						/>
						<input
							type="text"
							placeholder="Quote"
							value={studentData.quote}
							onChange={(e) =>
								setStudentData({ ...studentData, quote: e.target.value })
							}
							className="p-2 rounded col-span-2"
							style={{ border: "1px solid #d1d5db" }}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

const InfoRow = ({ label, value }) => {
	return (
		<div className="flex flex-col">
			<span
				className="font-bold text-xs"
				style={{
					fontFamily: "monospace",
					letterSpacing: "0.1em",
					color: "#f97316",
				}}
			>
				{label}
			</span>
			<span
				className="font-bold text-base"
				style={{
					fontFamily: "monospace",
					letterSpacing: "0.15em",
					color: "#000000",
				}}
			>
				{value}
			</span>
		</div>
	);
};

export default IDCardGenerator;
