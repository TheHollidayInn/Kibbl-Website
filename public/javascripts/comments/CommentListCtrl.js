angular.module('Comments')
.controller('CommentListCtrl', ['$scope', 'CommentService',
	function ($scope, CommentService) {
		$scope.comments = [];

		$scope.getComments = function (itemId) {
			CommentService.getComments()
			.then(function (response) {
				$scope.comments = response.data;
			});
		}
		$scope.getComments();

		$scope.addComment = function (text, itemId) {
			$scope.comments.push({
				user: '',
				text: text,
			})
			$scope.commentText = '';
			CommentService.addComment(text, itemId)
				.then(function (response) {
					$scope.comments += response.data;
				});
		};
	}]);
