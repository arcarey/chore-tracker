const pool = require('../modules/pool');

const CronJob = require('cron').CronJob;

// logs time the job runs
function presentTime() {
    var d = new Date(Date.now());
    return(
        d.toString()
    )
}




// every day @ 2 and 2:30 cst '0,30 2 * * *'
// every 10 seconds */10 * * * * *

module.exports = () => {
    const now = new Date(Date.now())
    // tell the computer what day it is to check against the assigned chores
    const job = new CronJob('0,30 2 * * *', function() {
        console.log('Cron Job Started', presentTime());


        let today = '';
        switch (now.getDay()) {
            case 0:
                today = 'Sunday'
                break
            case 1:
                today = 'Monday'
                break
            case 2:
                today = 'Tuesday'
                break
            case 3:
                today = 'Wednesday'
                break
            case 4:
                today = 'Thursday'
                break
            case 5:
                today = 'Friday' 
                break
            case 6:
                today = 'Saturday'
                break    
            default:
                break;
        }
        console.log(today);



        pool.query('SELECT * FROM user_chore')
            .then(response => {
                let choresToReset = response.rows.filter(chore => chore.recurrence.includes(today))
                choresToReset.forEach( chore => {
                    pool.query(`
                        UPDATE user_chore
                        SET "is_active" = 'true'
                        WHERE "id" = ${chore.id}
                        RETURNING id
                    `).then( response => {
                        console.log(response.rows, 'updated', presentTime())
                    }
                    ).catch(err => console.log(err))
                }
                )
            })
            .catch(err => console.log(err))

    },  null,
        true,
        'America/Chicago'
    );
    job.start();
}
