angular.module('Eggly',[
  'categories',
  'categories.bookmarks'
])
.controller('MainCtrl',function($scope){
  $scope.categories=[
    {"id":0, "name":"Development"},
    {"id":1, "name":"Design"},
    {"id":2, "name":"Exercise"},
    {"id":3, "name":"Humor"}
  ];
  $scope.bookmarks=[
    {"id":0, "title":"AngularJS", "url":"http://angular.org", "category":"Development"},
    {"id":1, "title":"Egghead.io", "url":"http://egghead.io", "category":"Development"},
    {"id":2, "title":"List a Apart", "url":"http://alistapart.com", "category":"Design"},
    {"id":3, "title":"One Page Love", "url":"http://onepagelove.org", "category":"Design"},
    {"id":4, "title":"Mobility WOD", "url":"http://mobilitywod.com", "category":"Exercise"},
    {"id":5, "title":"Robb Wolf", "url":"http://robwolf.com", "category":"Development"},
    {"id":6, "title":"Senor Gif", "url":"http://senorgif.com", "category":"Humor"},
    {"id":7, "title":"Wimp", "url":"http://wimp.com", "category":"Humor"},
    {"id":8, "title":"Dump", "url":"http://dump.com", "category":"Humor"}
  ];
  $scope.currentCategory=null;
  function setCurrentCategory(category){
    $scope.currentCategory=category;
    cancelCreating();
    cancelEditing();
  }
  function isCurrentCategory(category){
    return $scope.currentCategory !== null &&category.name === $scope.currentCategory.name;
  }

  $scope.isCurrentCategory = isCurrentCategory;
  $scope.setCurrentCategory= setCurrentCategory;

  //-----------------------------------------------------------------/
  //  CRUD                                                           /
  //-----------------------------------------------------------------/

  function resetCreateForm(){
    $scope.newBookmark = {
      title:'',
      url:'',
      category:$scope.currentCategory
    }
  }

  function createBookmark(bookmark){
    bookmark.id = $scope.bookmarks.length;
    $scope.bookmarks.push(bookmark);
    resetCreateForm();
  }

  function setEditingBookmark(bookmark){
    $scope.editedBookmark = angular.copy(bookmark);
  }

  function updateBookmark(bookmark){
    debugger;
    var index = _.findIndex($scope.bookmarks, function(b){
      return b.id == bookmark.id
    })
    $scope.bookmarks[index] = bookmark;
    $scope.editedBookmark = false;
    $scope.isEditing = false;
  }

  function isSelectedBookmark(bookmarkId){
    if($scope.editedBookmark){
      return $scope.editedBookmark !== null && $scope.editedBookmark.id===bookmarkId;
    }
  }

  function deleteBookmark(bookmark){
    _.remove($scope.bookmarks, function(b){
      return  b.id ==bookmark.id;
    })
  }

  $scope.setEditingBookmark = setEditingBookmark;
  $scope.createBookmark = createBookmark;
  $scope.updateBookmark = updateBookmark;
  $scope.isSelectedBookmark = isSelectedBookmark;
  $scope.deleteBookmark = deleteBookmark;


  //-----------------------------------------------------------------/
  //  Creating and editing States                                    /
  //-----------------------------------------------------------------/

  $scope.isEditing = false;
  $scope.isCreating= false;

  function startCreating(){
    $scope.isEditing=false;
    $scope.isCreating = true;
    resetCreateForm();
  }

  function cancelCreating(){
    $scope.isCreating = false;
  }

  function startEditing(){
    $scope.isEditing = true;
    $scope.isCreating = false;
  }

  function cancelEditing(){
    $scope.isEditing = false;
  }

  function shouldShowCreating(){
    return $scope.currentCategory && !$scope.isEditing;
  }

  function shouldShowEditing(){
    return $scope.isEditing && !$scope.isCreating;
  }

  $scope.startEditing = startEditing;
  $scope.startCreating = startCreating;
  $scope.cancelEditing = cancelEditing;
  $scope.cancelCreating = cancelCreating;
  $scope.shouldShowEditing = shouldShowEditing;
  $scope.shouldShowCreating = shouldShowCreating;
});
