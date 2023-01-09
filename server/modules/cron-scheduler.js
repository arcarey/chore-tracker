const CronJob = require('cron').CronJob;

// logs time the job runs
function presentTime() {
    var d = new Date(Date.now());
    return(
        d.toString()
    )
}




// every day @ 2 and 2:30 cst '0,30 2 * * *'

module.exports = () => {
    const job = new CronJob('0,30 2 * * *', function() {
        console.log('Cron Job Started', presentTime());
        console.log('Cron Job Ended', presentTime());
    },  null,
        true,
        'America/Chicago'
    );
    job.start();
}
