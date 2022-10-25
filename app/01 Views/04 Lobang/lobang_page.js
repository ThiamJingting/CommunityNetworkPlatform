const LobangPageViewModel = require("~/02 View Models/04 Lobang/lobang_page_vm");
const frameModule = require("@nativescript/core/ui/frame");
import { Dialogs } from `@nativescript/core`;

var page;
var vm;

exports.onLoaded = function (args) {
    page = args.object;
    page.actionBarHidden = true;
};

exports.onNavigatedTo = function (args) {
    const nvc = page.navigationContext;
    vm = new LobangPageViewModel();

    vm.set("lobang", nvc.lobang);
    vm.set("temp_lobang", Object.assign({}, nvc.lobang));
    vm.set("user", nvc.user);
    vm.set("temp_user", Object.assign({}, nvc.user));
    vm.getLobangHost();
    vm.getAnnouncements();
    vm.getProducts();
    vm.getOrders();
    vm.getRatings();
    page.bindingContext = vm;
};

exports.goBack = function () {
  frameModule.Frame.topmost().goBack();
};

exports.toggleDetailsTab = function() {
  vm.set("tab", "lobangDetails");
};

exports.toggleAnnouncementsTab = function() {
  vm.set("tab", "lobangAnnouncements");
};

exports.toggleOrdersTab = function() {
  vm.set("tab", "lobangOrders");
};

exports.hostOnTap = function(args) {
  const userTapped = args.object.parent.bindingContext;
  const frame = frameModule.Frame.topmost();
  const navigationEntry = {
    moduleName: "~/01 Views/06 Profile/profile_page",
    context: {
      user: userTapped,},
  };
  frame.navigate(navigationEntry);
};

exports.submitOrderOnTap = function(args) {
  const dataform = page.getViewById("myInfoDataForm");
  vm.submitOrder(() => {
    page.bindingContext = null;
    page.bindingContext =  vm;
  });
};

exports.showAnnouncementDialog = function() {
  const options = {
    title: "Create Announcement",
    defaultText: 'Write something',
    inputType: inputType.text,
    okButtonText: "Create",
    cancelButtonText: "Cancel",
    cancelable: true,
    capitalizationType: "sentences"
  };
  Dialogs.prompt(options).then((result) => {
    vm.createAnnouncement(result.text);
  });
};

exports.messageHostOnTap = function(args) {

}

exports.leaveRatingOnTap = function(args) {

}

exports.viewOrderOnTap = function(args) {

}

exports.viewOrderSummaryOnTap = function(args) {

}


