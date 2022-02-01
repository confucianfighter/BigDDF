/*
* DDF Magical Main Loop Pseudocode
*
*  Note, main loop does not wait for any promises to be fulfilled. Instead it checks all async
*   promise statuses each time around. This way it can check timeouts and errors without crashing.
*
* while(not error && not user_wants_exit)
*
*   If data_migration_check_timer.time_to_update is set to true, Check const version_number against stored
*   version number. If they are different, check the migration required flag is set in the version file. We
*   would set this to true if we need to change our data storage naming scheme or layout. We would make our
*   own data migration code that translates the old data into the new format.
*
*   If coin_history_data is null
*       check if there's a pending promise
*
*       otherwise check if there's a file or database entries
*           When reading file and database entries, read files or data twice, compare results.
*           When saving data, do a write, read it back, extract all the data, translate the results back to storage
*           format and compare the two. This says a lot about all logic involved in those things.
*
*       Note: All data will be converted mostly into data keyed by coin symbol and since we are using the keys for that,
*           sort order can be independent from lookups. If we have to we will make our own list class that keeps one
*           sorted list and one keyed list under the hoods.
*
*       Note: There is no timeout on coin history unless we get it from an external source, or database works
*       asynchronously.
*
*       Note: all JSON is in strings. If data is corrupted there is a high probability the number contains a
*       letter. We can take advantage of this make sure there are only number characters in the string
*       representation.
*
*
*   If tracked_coins is null or coins.timer.time_to_update is true;
*
*       check coins.promise for status of fulfilled , If it's fulfilled:
*
*           set coins.data to  promise.data
*
*           Make a new request, replace old coins.promise with new one
*
*           reset timer.
*
*   Do everything we did with retrieving  tracked_coins with current_assets, mock_assets, and tracked history then:
*
*       add an entry to coin history of the old prices
*       make a list for each set of data and key the lists by coin.
*
*
*
*   Run all TradeAdvisor strategies e.g. main_strategy.go(), experimental_strategy.go()...
*
*   main_strategy would look something like this:
*
*       if there is a percent increase above a certain amount add to buy recommends.
*
*       Compare current assets to prices in the list, make sell recommends
*
*       Check each exchange for availability add options to each trade recommend.
*
*       Add all recommended buys to mock_assets
*
*       Save all recommends to file just in case, don't want to send the same recommends
*       twice if there is a crash.
*
*   Check how long it's been since the last trade recommends were sent
*
*       Prepare an html document for each recommended trade list.
*       If times up, say an hour, half day or something send the trade recommends html documents over
*       email with a list of trade recommends from each strategy,
*       so far we have one, which might be all we need.
*
*       Make all mock trades and user approved trades as paper trades
*
*       Clear trade recommends list. Request a new one. Reset timer.
*
*   Note:  Mock profits is to see how our experimental automated trader is doing compared to the trades we would approve.
*   Calculate current profits (still paper trade) and current mock profits (from paper trade as well).
*
*       Note:  Mock profits is to see how our experimental automated trader is doing compared
*       to the trades we would approve.
*
*       If there are gains or losses, check how long it's been since the last profit email update:
*
*           If times up, send an email with gains and losses.
*
*   Check secure email for new settings or requests.
*       Emails will be sent in json format and either and be manually typed or sent by front end.
*       Send confirmation emails for all requests.
*       This has the advantage of automatically creating a log of transactions between front end and back end.
*
*       Done.
*
*       Error checking: When sending emails, have the front end send a copy confirmation. Retrieve copy
*           confirmation, translate it back to current data format and compare them. This  comparison is the
*           final tell in  errors in email translation logic. And it will tell us if data using the email method
*           is going to be reliable. We should do the same check from the front end when sending requests. Delete
*           all emails except the last request/confirmation pair so we can check it on crashes.
*
*           Note: for this to work, we must keep our own copy of current state inside the function, otherwise
*           asynchronous changes to promises could throw off our equality comparison.
*
*   If any settings have changed from the email request, set all current data to null so that
*       new requests will be made the next loop around.
*
*   Check error log data, if there is a fatal error, set error to true, main loop will be exited,
*       if errors aren't fatal just send an email of errors to ALL ADMINS and continue. One of us will see it
*       and alert the others.
*
*   Check if it's time to store data:
*
*   Translate all data into json storage format and write timestamped file. Don't delete the old one.
*
*       Error checking: Then read the json storage back into the way we are going to use it and see if
*           it matches the current data. This  comparison is the final tell in  errors in data storage
*           and retrieval logic.
*
*           Note: for this to work, we must keep our own copy of current state
*           inside the function.  Otherwise asynchronous changes to promises could throw off our equality
*           comparison. This  comparison is the final tell in  errors in data storage and retrieval logic.
*
*   After main loop:
*
*       Save all data, send an email to ALL admin users ( us dudes ) with exit status and error messages.
*
*       finally exit. Todo tiene su final, nada dura para siempre. Aun Díos es muy bueno.
* */

