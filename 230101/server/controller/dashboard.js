const crud = require('./crudUtil');
const Dashboard = require('../models/dashboard');
const Room = require('../models/room');
const Comment = require('../models/comment');


// 获取数据面板信息
const query = async ctx => {
    let [dashboard, rooms, comments] = [null, null, null];

    await crud.findOne(ctx, Dashboard, undefined, rel => (dashboard = rel));

    if (!dashboard) return await crud.add(ctx, Dashboard, dashboard);

    // 入住率、畅销产品
    await crud.find(ctx, Room, {}, rel => (rooms = rel));
    // 好评率
    await crud.find(ctx, Comment, {}, rel => (comments = rel));


    // 入住率计算、畅销产品计算
    dashboard.occupancy = 0;
    rooms.length && (rooms.forEach(x => x.status === 'live' && (dashboard.occupancy += 1)), (dashboard.hot = rooms.sort((a, b) => b.sale - a.sale)));

    // 计算好评率
    dashboard.comment = 0;
    comments.length && comments.map(x => x.satisfaction && (dashboard.comment += 1));

    // 更新Dashboard数据
    await crud.update(ctx, Dashboard, {_id: dashboard._id}, {
        $set: {
            hot:dashboard.hot,
            comment: Number((dashboard.comment / comments.length).toFixed(2)),
            occupancy: Number((dashboard.occupancy / rooms.length).toFixed(2))
        }
    });
    // 返回数据
    await crud.findOne(ctx, Dashboard, {_id: dashboard._id});
}


module.exports = {query}
