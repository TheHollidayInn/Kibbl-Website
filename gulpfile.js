var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var babel = require('gulp-babel');

var dependentjsfiles = [
  'public/bower_components/jquery/dist/jquery.min.js',
  'public/bower_components/bootstrap/dist/js/bootstrap.min.js',
  'public/bower_components/bootstrap-material-design/dist/js/material.min.js',
  'public/bower_components/angular/angular.min.js',
  'public/bower_components/angular-route/angular-route.min.js',
  'public/bower_components/ngstorage/ngStorage.min.js',
  'public/bower_components/angular-bootstrap/ui-bootstrap.min.js',
  'public/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
  'public/bower_components/angularjs-social-login/angularjs-social-login.js',
  'public/bower_components/angulartics/dist/angulartics.min.js',
  'public/bower_components/angulartics-google-analytics/dist/angulartics-ga.min.js',
];

var jsfiles = [
  // 'public/javascripts/*.js',
  // 'public/javascripts/*/*.js',
  'public/javascripts/app.js',
  'public/javascripts/controllers/HomeCtrl.js',
  'public/javascripts/controllers/Auth.js',
  'public/javascripts/controllers/NavCtrl.js',
  'public/javascripts/controllers/favoriteListCtrl.js',
  'public/javascripts/directives/googlePlaces.js',
  'public/javascripts/pets/Pets.js',
  'public/javascripts/pets/PetCtrl.js',
  'public/javascripts/pets/PetDetailCtrl.js',
  'public/javascripts/volunteer/Volunteer.js',
  'public/javascripts/volunteer/VolunteerCtrl.js',
  'public/javascripts/volunteer/VolunteerDetailCtrl.js',
  'public/javascripts/volunteer/VolunteerService.js',
  'public/javascripts/events/Event.js',
  'public/javascripts/events/EventListCtrl.js',
  'public/javascripts/events/EventDetailCtrl.js',
  'public/javascripts/events/EventService.js',
  'public/javascripts/shelters/Shelters.js',
  'public/javascripts/shelters/ShelterListCtrl.js',
  'public/javascripts/shelters/ShelterDetailCtrl.js',
  'public/javascripts/shelters/ShelterService.js',
  'public/javascripts/messages/Message.js',
  'public/javascripts/messages/MessageListCtrl.js',
  'public/javascripts/messages/MessageDetailCtrl.js',
  'public/javascripts/messages/MessageService.js',
  'public/javascripts/notifications/Notification.js',
  'public/javascripts/notifications/NotificationListCtrl.js',
  'public/javascripts/notifications/NotificationService.js',
  'public/javascripts/comments/Comments.js',
  'public/javascripts/comments/CommentListCtrl.js',
  'public/javascripts/comments/CommentService.js',
  'public/javascripts/comments/CommentDirective.js',
  'public/javascripts/feedback/Feedback.js',
  'public/javascripts/feedback/FeedbackListCtrl.js',
  'public/javascripts/feedback/FeedbackService.js',
];

gulp.task('concat', function() {
  let files = dependentjsfiles.concat(jsfiles);

  gulp.src(jsfiles)
    .pipe(concat('all.js'))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(rename('uglify.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/dist'));

  files = dependentjsfiles.concat(['public/dist/uglify.js']);

  return gulp.src(dependentjsfiles)
    .pipe(concat('deps.js'))
    .pipe(gulp.dest('public/dist'));
});
