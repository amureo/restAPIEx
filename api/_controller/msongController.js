const db = require("../../plugins/mysql");
const TABLE = require("../../util/TABLE");
const STATUS = require("../../util/STATUS");
const { resData, currentTime, isEmpty } = require("../../util/lib");
const moment = require("../../util/moment");

//전체 row 갯수
const getTotal = async () => {
    try {
      const query = `SELECT COUNT(*) AS cnt FROM ${TABLE.MSONG}`;
      const [[{ cnt }]] = await db.execute(query);
      return cnt;
    } catch (e) {
      console.log(e.message);
      return resData(STATUS.E300.result, STATUS.E300.resultDesc, currentTime());
    }
  };
  // row 존재유무
  const getSelectOne = async (id) => {
    // const getTotal = async function () {
    try {
      const query = `SELECT COUNT(*) AS cnt FROM ${TABLE.MSONG} WHERE id=?`;
      const values = [id];
      const [[{ cnt }]] = await db.execute(query, values);
      return cnt;
    } catch (e) {
      console.log(e.message);
      return resData(STATUS.E300.result, STATUS.E300.resultDesc, moment().format('LT'));
    }
  };
  
  // 페이징으로 가져오기
  const getList = async (req) => {
    try {
      // 마지막 id, len 갯수
      const lastId = parseInt(req.query.lastId) || 0;
      const len = parseInt(req.query.len) || 10;
  
      let where = "";
      if (lastId) {
        // 0은 false
        where = `WHERE id < ${lastId}`;
      }
      const query = `SELECT * FROM ${TABLE.MSONG} ${where} order by id desc limit 0, ${len}`;
      const [rows] = await db.execute(query);
      return rows;
    } catch (e) {
      console.log(e.message);
      return resData(STATUS.E300.result, STATUS.E300.resultDesc, currentTime());
    }
  };



const msongController = {
    
    list: async (req) => {
        const totalCount = await getTotal();
        const list = await getList(req);
        if (totalCount > 0 && list.length) {
            return resData(
                STATUS.S200.result,
                STATUS.S200.resultDesc,
                currentTime(),
                { totalCount, list }
            );
        } else {
          return resData(STATUS.S201.result, STATUS.S201.resultDesc, currentTime());
        }
    },
   
}
module.exports = msongController;