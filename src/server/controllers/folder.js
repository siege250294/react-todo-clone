var Folder = require('../models/Folder')
var List = require('../models/List')
var Todo = require('../models/Todo')
var { removeListByFolder } = require('./list')

function createFolder(folder, cb) {
    var new_folder = new Folder({
        title: folder.title,
        order: folder.order,
        _user: folder._user
    })
    new_folder.save(function(err) {
        if (err) {
            return cb(err)
        }
        return cb()
    })
}

function editFolder(folder_id, folder, cb) {
    Folder.findByIdAndUpdate(folder_id, {
        title: folder.title,
        order: folder.order
    }, { runValidators: true}, function(err) {
        if (err) {
            return cb(err)
        }
        return cb()
    })
}

function removeFolder(folder_id, cb) {
    // First we need to find all related lists and remove them
    removeListByFolder(folder_id, function(err) {
        if (err) {
            return cb(err)
        }
        Folder.findByIdAndRemove(folder_id, function(err, raw) {
            if (err) {
                return cb(err)
            }
            return cb()
        })
    })
}

module.exports = {
    createFolder,
    editFolder,
    removeFolder
}