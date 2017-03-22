angular.module('Comments')
.controller('CommentListCtrl', ['$scope', 'CommentService',
	function ($scope, CommentService) {
		$scope.comments = [];

		$scope.getComments = function () {
			CommentService.getComments()
			.then(function (response) {
				$scope.comments = response.data;
			});
		}
		$scope.getComments();

		$scope.addComment = function (text) {
			$scope.comments.push({
				user: '',
				text: text,
			})
			$scope.commentText = '';
			// CommentService.addComment(text)
			// 	.then(function (response) {
			// 		$scope.comments += response.data;
			// 	});
		};
	}]);
