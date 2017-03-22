angular.module('Comments')
.controller('CommentListCtrl', ['$scope', 'CommentService',
	function ($scope, CommentService) {
		$scope.comments = [];

		$scope.getComments = function (itemId) {
			CommentService.getComments(itemId)
			.then(function (response) {
				$scope.comments = response.comments;
			});
		}

		$scope.$watch('itemId', function (newValue, oldValue) {
			if (!newValue) return;
			$scope.getComments($scope.itemId);
		});

		$scope.addComment = function (text, itemId) {
			// $scope.comments.push({
			// 	user: '',
			// 	text: text,
			// })
			$scope.commentText = '';
			CommentService.addComment(text, itemId)
				.then(function (response) {
					$scope.comments.push(response.comment);
				});
		};
	}]);
