### Build List

## Back End
[ ] CRUD LIST FOR BE
    [√] USER router
       [√] POST non-parent user with family name/id (this will have to be handled asyc on the FE in the login saga)
       [√] POST parent user with family name/id (this will also be handled on the FE with the login saga)     
       [√] GET user list by family id (family router???)
    [√] family router
        [√] GET by id
        [√] POST name
        <!-- how do I assign that family ID when registering??? -->
    [√] goal-prog
        [√] POST new goal
        [√] PUT goal prog
        [√] PUT new goal
        [√] DELETE goal
        [√] GET
    [√] create a completed goal for the parent to see and reward?
    [√] chore
        [√] POST new chore
        [√] DELETE chore
        [√] GET
    [√] user_chore
        [√] POST new chore instance assigned to user
        [√] PUT chore as complete (/api/user_chore/complete)
        [√] DELETE chore instance
        [√] GET chore
    [√] completed_chore
        [√] POST completed chore
        [√] Delete completed chore
        [√] GET by user_id
    [ ] PUT chore as active on interval (cron) make it's own file
    [ ] PUT profile pic URL (Stretch)



1-2-22 DO ALL OF THESE TODAY, APPLY FOR 2 JOBS.
THE FIRST THING I NEED TO DO IS GET LOGGED IN AS A USER THAT INCLUDES THEIR FAMILY ID