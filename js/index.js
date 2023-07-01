angular.module('Recog', [])

	.controller('RecogCtrl', ['$scope', function ($scope) {
		$scope.text = 'Click Microphone to Start Game and Say follow word to show';
		$scope.switch = 'fa fa-microphone';
		$scope.ShowScore = 'hidden';
		$scope.ShowLevel = 'hidden';

		$scope.num = 0;
		$scope.Level = 1;
		$scope.Score = 0;
		$scope.status = false;
		const DataWord = {

			"level1": [
				{ "word": "dog", "mean": "หมา" },
				{ "word": "cat", "mean": "แมว" },
				{ "word": "fish", "mean": "ปลา" },
				{ "word": "bird", "mean": "นก" },
				{ "word": "toy", "mean": "ของเล่น" },
				{ "word": "car", "mean": "รถยนต์" },
				{ "word": "football", "mean": "ฟุตบอล" },
				{ "word": "rain", "mean": "ฝน" },
				{ "word": "boat", "mean": "เรือ" },
				{ "word": "plane", "mean": "เครื่องบิน" }
			],
			"level2": [
				{ "word": "search", "mean": "ค้นหา" },
				{ "word": "goodjob", "mean": "ยอดเยี่ยม" },
				{ "word": "lucky", "mean": "โชคดี" },
				{ "word": "handsome", "mean": "หล่อ" },
				{ "word": "shopping", "mean": "ช้อปปิ้ง" },
				{ "word": "testing", "mean": "ทดสอบ" },
				{ "word": "question", "mean": "คำถาม" },
				{ "word": "ask", "mean": "ถาม" },
				{ "word": "lion", "mean": "สิงโต" },
				{ "word": "policeman", "mean": "ตำรวจ" }
			],
			"level3": [
				{ "word": "basketball", "mean": "ลูกบาสเก็ตบอล" },
				{ "word": "finish", "mean": "เสร็จสิ้น" },
				{ "word": "complete", "mean": "เสร็จสิ้น" },
				{ "word": "compare", "mean": "เปรียบเทียบ" },
				{ "word": "restart", "mean": "เริ่มต้นใหม่" },
				{ "word": "university", "mean": "มหาวิทยาลัย" },
				{ "word": "healing", "mean": "การรักษา" },
				{ "word": "competitive", "mean": "การแข่งขัน" },
				{ "word": "watching", "mean": "การดู" },
				{ "word": "telling", "mean": "การบอกเล่า" }
			],
			"level4": [
				{ "word": "appear", "mean": "ปรากฎ" },
				{ "word": "autumn", "mean": "ฤดูใบไม้ร่วง" },
				{ "word": "president", "mean": "ประธานาธิบดี" },
				{ "word": "protect", "mean": "ปกป้อง" },
				{ "word": "pilot", "mean": "นักบิน" },
				{ "word": "slide", "mean": "สไลด์" },
				{ "word": "warm", "mean": "อบอุ่น" },
				{ "word": "young", "mean": "หนุ่มสาว" },
				{ "word": "farmer", "mean": "ชาวนา" },
				{ "word": "fix", "mean": "แก้ไขปัญหา" }
			],
			"level5": [
				{ "word": "ability", "mean": "ความสามารถ" },
				{ "word": "capture", "mean": "การจับกุม" },
				{ "word": "disease", "mean": "โรค" },
				{ "word": "enable", "mean": "ทำให้สามารถ" },
				{ "word": "intend", "mean": "ตั้งใจ" },
				{ "word": "journey", "mean": "การเดินทาง" },
				{ "word": "launch", "mean": "เปิด" },
				{ "word": "observe", "mean": "สังเกต" },
				{ "word": "opponent", "mean": "คู่แข่ง" },
				{ "word": "origin", "mean": "ที่มา" }
			]
		};
		var recognition = new webkitSpeechRecognition();
		recognition.continuous = true;
		recognition.interimResults = true;
		recognition.lang = 'en-US';
		recognition.onresult = function (event) {
			for (var i = event.resultIndex; i < event.results.length; ++i) {
				/* $scope.$apply(function () {
				   $scope.text = event.results[i][0].transcript;
				 });*/
				if (event.results[i].isFinal) {
					$scope.$apply(function () {
						$scope.text = event.results[i][0].transcript;
						$scope.confidence = `ความมั่นใจในเสียงพูด : ` + (event.results[i][0].confidence * 100).toFixed(1);
					});
				}
			}
			checkWord(Level, Score);
		};

		$scope.on = false;
		$scope.startStop = function () {
			$scope.on = !$scope.on;
			if ($scope.on) {
				recognition.start();

				swal(`วิธีการเล่น \n พูดตามคำที่ปรากฎให้ถูกต้อง(มีทั้งหมด 5 level)\n**พูดถูกต้องได้ 100 คะแนน`);
				$scope.switch = 'hidden';
				$scope.ShowScore = 'score';
				$scope.ShowLevel = 'level';
				document.getElementById("Score").innerHTML = `Score : ` + 0;
				document.getElementById("Level").innerHTML = `Level : ` + 1;
				InputWord(Level);
			}
			if (!$scope.on) {
				recognition.stop();
			}
		}
		function checkWord(Level, Score) {
			if ($scope.text.split(' ').join('').toLowerCase() == DataWord["level" + $scope.Level][$scope.num].word) {
				$scope.Level = $scope.Level + 1;

				$scope.num = Math.floor(Math.random() * 10);
				//$scope.Word = DataWord["level" + var Level][$scope.num].word;

				$scope.Score += 100;


				console.log("t")
				swal(`ถูกต้องนะครับ\n` + $scope.confidence + `%`).then(function () {
					document.getElementById("Score").innerHTML = `Score : ` + $scope.Score;
					if ($scope.Level < 6) {
						document.getElementById("Level").innerHTML = "Level : " + $scope.Level;
						document.getElementById("word").innerHTML = DataWord["level" + $scope.Level][$scope.num].word;
						document.getElementById("mean").innerHTML = DataWord["level" + $scope.Level][$scope.num].mean;
					}
					else {
						swal(`จบเกม คุณเก่งมาก`).then(function () {

							$scope.switch = 'fa fa-microphone';
							$scope.ShowScore = 'hidden';
							$scope.ShowLevel = 'hidden';
							window.location.replace('index.html');
						});
					}

				});
			}
			else {
				console.log("f")
			}
		}
		function InputWord(Level) {
			$scope.num = Math.floor(Math.random() * 10);
			//$scope.Word = DataWord["level" + var Level][$scope.num].word;
			document.getElementById("word").innerHTML = DataWord["level" + $scope.Level][$scope.num].word;
			document.getElementById("mean").innerHTML = DataWord["level" + $scope.Level][$scope.num].mean;
		}
	}]);
