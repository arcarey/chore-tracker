### Build List

## Back End
[√] CRUD LIST FOR BE
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
    [ ] PUT chore as active on interval (cron) make it's own file (next week)
    [√] build Nav routing to 8 views
    [√] build login
    [√] build register 
            [√] register new user
            [√] then hit a register new family page
    [√] build nav bar component
    [√] build logout component
    [ ] child task page
        [√] child user card component
            [ ] progress component 
        [√] task component
            [√] delete btn
            [√] assign btn
    [√] add chore
    [√] return array of chores
        [√] add child (this is an important new login function)
        [√] add child saga
        [√] add new user store
        [√] render list of children for each family in it's own component under the add new child page
        [√] add name column to user table so each child can be displayed by name


PRIORITY LIST:    
   [√] ASSIGN/UNASSIGN TASKS TO CHILD
   [√] READ WHETHER TASKS ARE ASSIGNED TO CHILD
   [√] LOCAL STATE FOR SWITCH POSITION
   [√]   SWITCH ADDS AND REMOVES TASK FROM CHILD TASK LIST

        
   [√] LOGIN AS CHILD TO SEE TASK LIST
   [√] MARK TASKS AS COMPLETE
   [√]     DEACTIVATE TASK
        CAN BE REACTIVATED BY SCHEDULER program

    
    COMPLETE TASK LIST VIEW FOR PARENT
    COMPLETE TASK LIST VIEW FOR EACH CHILD

    TASK RECURRENCE SETUP
        some kind of tag on child detail page

    HIDE COPYRIGHT UNDER NAV BAR THAT CAN BE SCROLLED TO

        

## PAGES YET TO BUILD
[√] Login
[√] Register
[ ] Completed Chore List (un-complete a chore as a parent/admin)
[√] Modal for assigning recurrence
[ ] Info Page

## OTHER MAJOR FUNCTIONALITY
[ ] Cron
    [√] schedule and test Cron schedule
    [ ] write program to check whole user_chore and reactivate the stuff it should
[ ] Add and remove chores from a child while keeping the completed chore log
[ ] Make child detail a MUI swipeable drawer 
[ ] make sure the back button starts to work

[ ] UR sure dialogues on delete

## OTHER MAJOR STYLING
[ ] New Theme colors
[ ] App Specific design (maybe background on login or something???)
[√] Add the .env file




   
    CLEARING INPUTS






    ADD GOAL/GOAL PROGRESS
    




    [ ] PUT profile pic URL (Stretch)
