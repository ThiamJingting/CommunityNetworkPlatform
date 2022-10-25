const observableModule = require("@nativescript/core/data/observable");
const {
  getMockUserByUserId,
} = require("~/07 Services/mock_service");

function Announcement(info) {
  info = info || {
    announcement_id: undefined,
    user: undefined,
    datetime: undefined,
    description: undefined,
    picture: undefined,
  };

  var announcementModel = observableModule.fromObject({
    announcement_id: info.announcement_id,
    user: info.user,
    datetime: info.datetime,
    description: info.description,
    picture: info.picture,
  });

  return announcementModel;
}

module.exports = Announcement;