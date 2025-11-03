import React, { useState } from "react";
import html2canvas from "html2canvas";

const IDCardGenerator = () => {
	const [students, setStudents] = useState([
		{
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
		},
	]);

	const [currentIndex, setCurrentIndex] = useState(0);
	const [csvData, setCsvData] = useState("");
	const [uploadingImage, setUploadingImage] = useState(false);

	const currentStudent = students[currentIndex];

	// Parse CSV/TSV data from Google Sheets
	const handleCSVImport = (csvText) => {
		const lines = csvText.trim().split("\n");
		const delimiter = lines[0].includes("\t") ? "\t" : ",";
		const headers = lines[0].split(delimiter).map((h) => h.trim());

		const parsedStudents = lines.slice(1).map((line) => {
			const values = line.split(delimiter).map((v) => v.trim());
			const student = {};

			headers.forEach((header, index) => {
				const fieldMapping = {
					"Preferred picture": "photoUrl",
					"Date of Birth (Day/Month)": "birthday",
					Nickname: "nickname",
					"Relationship status": "relationship",
					"School crush": "schoolCrush",
					"Hobbies/skills": "hobbies",
					"Favourite course/most challenging course": "favCourse",
					"Best level in YCT": "bestLevel",
					"Worst level in YCT": "worstLevel",
					"If not Architecture, what course": "alternativeCareer",
					"Best Lecturer": "lecturer",
					"Best quote": "quote",
					"State of origin": "state",
					"Advice to the younger ones": "advice",
					"Social media handles": "socialMedia",
					Name: "name",
					"Full Name": "name",
					Birthday: "birthday",
					"Date of Birth": "birthday",
					"Relationship Status": "relationship",
					"School Crush": "schoolCrush",
					Crush: "schoolCrush",
					"Hobbies/Skills": "hobbies",
					Hobbies: "hobbies",
					"Favorite Course": "favCourse",
					"Fav Course": "favCourse",
					"Most Challenging Course": "challengingCourse",
					"Challenging Course": "challengingCourse",
					"Best Level in YCT": "bestLevel",
					"Best Level": "bestLevel",
					"Worst Level in YCT": "worstLevel",
					"Worst Level": "worstLevel",
					"Alternative Career": "alternativeCareer",
					"Best Quote": "quote",
					Quote: "quote",
					"State of Origin": "state",
					State: "state",
					"Advice to the Youngies": "advice",
					Advice: "advice",
					"Photo URL": "photoUrl",
					"Image URL": "photoUrl",
					Set: "set",
				};

				const mappedField =
					fieldMapping[header] || header.toLowerCase().replace(/\s+/g, "");
				student[mappedField] = values[index] || "";
			});

			if (!student.name && student.nickname) {
				student.name = student.nickname;
			}

			if (!student.set) {
				student.set = "RENAISSANCE SET 25'";
			}

			// Set photo to null initially, will be uploaded manually
			student.photo = null;

			return student;
		});

		setStudents(parsedStudents);
		setCurrentIndex(0);
	};

	// Handle manual image upload for each student
	const handleImageUpload = (e, studentIndex) => {
		const file = e.target.files[0];
		if (file) {
			setUploadingImage(true);
			const reader = new FileReader();
			reader.onloadend = () => {
				const updatedStudents = [...students];
				updatedStudents[studentIndex].photo = reader.result;
				setStudents(updatedStudents);
				setUploadingImage(false);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleDownload = async (studentIndex = currentIndex) => {
		const card = document.getElementById(`id-card-${studentIndex}`);
		const button = card.querySelector(".download-btn");
		button.style.display = "none";

		const canvas = await html2canvas(card, {
			backgroundColor: null,
			scale: 2,
			useCORS: true,
			allowTaint: false,
		});

		button.style.display = "flex";

		const link = document.createElement("a");
		link.download = `${students[studentIndex].name.replace(
			/\s+/g,
			"_"
		)}_ID_Card.png`;
		link.href = canvas.toDataURL("image/png");
		link.click();
	};

	const handleDownloadAll = async () => {
		for (let i = 0; i < students.length; i++) {
			await handleDownload(i);
			await new Promise((resolve) => setTimeout(resolve, 1000));
		}
	};

	return (
		<div className="min-h-screen p-8" style={{ backgroundColor: "#f3f4f6" }}>
			<div className="max-w-6xl mx-auto">
				{/* Import Section */}
				<div
					className="mb-8 p-6 rounded-lg shadow-lg"
					style={{ backgroundColor: "#ffffff" }}
				>
					<h2 className="text-2xl font-bold mb-4" style={{ color: "#111827" }}>
						Import Google Sheets Data
					</h2>

					<div
						className="mb-4 p-4 rounded"
						style={{ backgroundColor: "#e0f2fe", border: "1px solid #0ea5e9" }}
					>
						<p className="text-sm mb-2" style={{ color: "#075985" }}>
							<strong>📋 Instructions:</strong>
						</p>
						<ol
							className="text-sm space-y-1 ml-4"
							style={{ color: "#0c4a6e", listStyle: "decimal" }}
						>
							<li>Copy all data from your Google Sheets (including headers)</li>
							<li>Paste into the textarea below</li>
							<li>Click "Import Data"</li>
							<li>
								Upload images for each student manually (better quality & no
								CORS issues!)
							</li>
						</ol>
					</div>

					<textarea
						value={csvData}
						onChange={(e) => setCsvData(e.target.value)}
						placeholder="Paste Google Sheets data here (include headers)..."
						className="w-full p-3 rounded font-mono text-sm"
						style={{
							border: "1px solid #d1d5db",
							minHeight: "150px",
							backgroundColor: "#f9fafb",
						}}
					/>

					<div className="flex gap-3 mt-4">
						<button
							onClick={() => handleCSVImport(csvData)}
							className="font-bold py-2 px-6 rounded-lg shadow transition-all"
							style={{
								backgroundColor: "#16a34a",
								color: "#ffffff",
							}}
							onMouseEnter={(e) => (e.target.style.backgroundColor = "#15803d")}
							onMouseLeave={(e) => (e.target.style.backgroundColor = "#16a34a")}
						>
							Import Data ({csvData.split("\n").length - 1} rows)
						</button>

						{students.length > 1 && (
							<button
								onClick={handleDownloadAll}
								className="font-bold py-2 px-6 rounded-lg shadow transition-all"
								style={{
									backgroundColor: "#7c3aed",
									color: "#ffffff",
								}}
								onMouseEnter={(e) =>
									(e.target.style.backgroundColor = "#6d28d9")
								}
								onMouseLeave={(e) =>
									(e.target.style.backgroundColor = "#7c3aed")
								}
							>
								Download All Cards ({students.length})
							</button>
						)}
					</div>
				</div>

				{/* Navigation */}
				{students.length > 1 && (
					<div
						className="mb-6 p-4 rounded-lg shadow flex items-center justify-between"
						style={{ backgroundColor: "#ffffff" }}
					>
						<button
							onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
							disabled={currentIndex === 0}
							className="font-bold py-2 px-4 rounded-lg transition-all"
							style={{
								backgroundColor: currentIndex === 0 ? "#d1d5db" : "#3b82f6",
								color: "#ffffff",
								cursor: currentIndex === 0 ? "not-allowed" : "pointer",
							}}
						>
							← Previous
						</button>

						<span className="font-bold" style={{ color: "#111827" }}>
							Student {currentIndex + 1} of {students.length}
						</span>

						<button
							onClick={() =>
								setCurrentIndex(Math.min(students.length - 1, currentIndex + 1))
							}
							disabled={currentIndex === students.length - 1}
							className="font-bold py-2 px-4 rounded-lg transition-all"
							style={{
								backgroundColor:
									currentIndex === students.length - 1 ? "#d1d5db" : "#3b82f6",
								color: "#ffffff",
								cursor:
									currentIndex === students.length - 1
										? "not-allowed"
										: "pointer",
							}}
						>
							Next →
						</button>
					</div>
				)}

				{/* Image Upload Section */}
				<div
					className="mb-6 p-4 rounded-lg shadow"
					style={{ backgroundColor: "#ffffff" }}
				>
					<h3 className="font-bold mb-2" style={{ color: "#111827" }}>
						Upload Image for {currentStudent.name}
					</h3>
					<input
						type="file"
						accept="image/*"
						onChange={(e) => handleImageUpload(e, currentIndex)}
						className="w-full p-2 rounded"
						style={{ border: "1px solid #d1d5db" }}
					/>
					{currentStudent.photo && (
						<p className="text-sm mt-2" style={{ color: "#16a34a" }}>
							✓ Image uploaded successfully
						</p>
					)}
				</div>

				{/* ID Card */}
				<IDCard
					student={currentStudent}
					index={currentIndex}
					onDownload={handleDownload}
				/>
			</div>
		</div>
	);
};

const IDCard = ({ student, index, onDownload }) => {
	return (
		<div className="max-w-4xl mx-auto">
			<div
				id={`id-card-${index}`}
				className="relative w-full rounded-lg overflow-hidden shadow-2xl"
				style={{
					aspectRatio: "8.5/11",
					backgroundImage: "url('./grass_bg.jpg')",
					backgroundSize: "cover",
				}}
			>
				{/* Header */}
				<div
					className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between"
					style={{
						color: "#ffffff",
					}}
				>
					<div className="flex items-center gap-4">
						<div className="relative w-[100px] h-[100px] rounded-full flex justify-center items-center">
							<div className="w-[80px] h-[80px] rounded-full overflow-hidden bg-white">
								{" "}
							</div>
							<img src="/logo2.png" width={100} alt="logo" className="absolute top-[2px] -left-[8px]"/>
						</div>
						<div>
							<h1
								className="font-bold text-2xl leading-tight relative -top-[10px]"
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
				</div>

				{/* Main Content Area */}
				<div className="absolute top-28 left-0 right-0 bottom-0 flex">
					{/* Left Side - Photo and Name */}
					<div className="w-2/5 p-6 flex flex-col justify-center h-[85%]">
						<div className="mb-4 z-20">
							<p
								className="font-bold text-lg bg-[#f97316] text-center py-4 flex items-center justify-center"
								style={{
									fontFamily: "monospace",
									letterSpacing: "0.15em",
									color: "#ffffff",
								}}
							>
								<span className="relative -top-[7px]">FYB OF THE DAY</span>
							</p>
						</div>

						<div className=" flex items-center justify-center mb-4 h-80 z-100">
							<div className="relative">
								<div
									className="absolute inset-0 rounded-lg transform -rotate-2"
									style={{
										background:
											"linear-gradient(to bottom right, #ca8a04, #78350f)",
									}}
								></div>

								<div
									className="relative p-2 rounded-lg shadow-lg"
									style={{ backgroundColor: "#ffffff" }}
								>
									<div
										className="w-[386px] h-[480px] rounded flex items-center justify-center overflow-hidden"
										style={{
											backgroundColor: "#e5e7eb",
											backgroundImage: `url( ${
												student.photo ? student.photo : "none"
											})`,
											backgroundSize: "cover",
										}}
									>
										{!student && (
											<div
												className="w-full h-full flex items-center justify-center"
												style={{
													background:
														"linear-gradient(to bottom right, #d1d5db, #9ca3af)",
												}}
											>
												<span style={{ color: "#6b7280" }} className="text-sm">
													UPLOAD IMAGE
												</span>
											</div>
										)}
									</div>
								</div>

								<div
									className="absolute -right-8 top-1/4 w-20 h-32 rounded-t-full "
									style={{ backgroundColor: "#15803d", opacity: 0.5 }}
								></div>
							</div>
						</div>

						<div
							className="p-4 rounded-lg text-center z-20"
							style={{ backgroundColor: "rgba(20, 83, 45, 0.7)" }}
						>
							<h2
								className="font-bold text-3xl relative -top-[10px]"
								style={{
									fontFamily: "brush script mt, cursive",
									letterSpacing: "0.05em",
									color: "#ffffff",
								}}
							>
								{student.name}
							</h2>
						</div>
					</div>

					{/* Right Side - Information Panel */}
					<div
						className="w-3/5 h-[85%] p-6 rounded-l-3xl shadow-2xl"
						style={{
							background:
								"linear-gradient(to bottom right, rgba(229,231,235,0.7), rgba(210,213,218,0.7), rgba(255,255,255,0.6))",
							backdropFilter: "blur(12px)",
							WebkitBackdropFilter: "blur(12px)",
						}}
					>
						<div className="space-y-2 text-sm">
							<InfoRow label="BIRTHDAY" value={student.birthday} />
							<InfoRow label="NICK NAME" value={student.nickname} />
							<InfoRow
								label="RELATIONSHIP STATUS"
								value={student.relationship}
							/>
							<InfoRow label="SCHOOL CRUSH" value={student.schoolCrush} />
							<InfoRow label="HOBBIES/SKILLS" value={student.hobbies} />
							<InfoRow label="FAV COURSE" value={student.favCourse} />
							<InfoRow
								label="MOST CHALLENGING COURSE"
								value={student.challengingCourse}
							/>
							<InfoRow label="BEST LEVEL IN YCT" value={student.bestLevel} />
							<InfoRow label="WORST LEVEL IN YCT" value={student.worstLevel} />
							<InfoRow
								label="IF NOT ARCHITECTURE,WHAT?"
								value={student.alternativeCareer}
							/>
							<InfoRow label="BEST QUOTE" value={student.quote} />
							<InfoRow label="STATE OF ORIGIN" value={student.state} />
							<InfoRow label="ADVISE TO THE YOUNGIES" value={student.advice} />
						</div>
					</div>
				</div>

				{/* Footer */}
				<div className="absolute bottom-20 right-6 ">
					<h3
						className="font-bold text-[46px] font-[permanent_marker]"
						style={{
							color: "#ffffff",
						}}
					>
						RENAISSANCE SET 25'
					</h3>
				</div>

				{/* Download Button */}
				<div className="download-btn absolute bottom-4 left-4">
					<button
						onClick={() => onDownload(index)}
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
		</div>
	);
};

const InfoRow = ({ label, value }) => {
	return (
		<div className="flex flex-col">
			<span
				className="font-black text-[18px]"
				style={{
					fontFamily: "monospace",
					letterSpacing: "0.1em",
					color: "#9a3412",
				}}
			>
				{label}
			</span>
			<span
				className="font-bold text-2xl"
				style={{
					fontFamily: "monospace",
					letterSpacing: "0.15em",
					color: "#000000",
				}}
			>
				{value ? value : "Nil"}
			</span>
		</div>
	);
};

export default IDCardGenerator;
