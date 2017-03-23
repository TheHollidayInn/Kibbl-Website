angular.module('Feedback')
.controller('FeedbackListCtrl', ['$scope', 'FeedbackService',
	function ($scope, FeedbackService) {
		$scope.feedbacks = [];

		$scope.getFeedbacks = function () {
			FeedbackService.getFeedbacks()
			.then(function (response) {
				$scope.feedbacks = response.feedback;
			});
		}
		$scope.getFeedbacks();

		$scope.addFeedback = function (text) {
			// $scope.comments.push({
			// 	user: '',
			// 	text: text,
			// })
			$scope.commentText = '';
			FeedbackService.addFeedback(text)
				.then(function (response) {
					$scope.feedbacks.push(response.feedback);
				});
		};
	}]);
