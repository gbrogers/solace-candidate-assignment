# Improvements If Given More Time

This document outlines the next steps I would take given more time to enhance the solution improvements. These are non-inclusive, but are a starting point.

---

## Client Improvements

1. **Debouncing of Search**  
   With 15 records, deboucing is no huge deal, but if that were to expand much more, I'd want to debouce the search so that we are not doing a ton of api requests to make a search. An alternative is for an explicit "search" button to trigger the update. I tend to prefer immediate feedback, so went that route for now. Would need to better understand user use cases to make a better call. 

2. **More Unit Testing**  
   I added a single unit test just to get started, but would want more robust coverage.

3. **Expand sort and filter abilities**
    There are a number improvement here:
        - Implement default sort.
        - Stop hard coding the sort and filter columns in multiple places. 
        - Sort is a bit hacky since it is a checkbox -- a checkbox indicated boolean    where as this sort goes "off" -> "on-asc"<->"on-desc".
        - Allow for more filters -- Immediately, I could see the degree being a candidate.

4. **UI/UX improvements**
    There are a number of improvements I would like here, starting with how the refinement controls are laid out. They work for the limited sort and filter options, but as they expand I would need to find a better solution. Filter UI is rather straight forward on a list like this, but sort is a bit more tricky. I'd want to do some more research and consult with others.

5. **A lot of code polishing, generally**
    Code gets the job done but wouldn't say it is beautiful yet. Styling is duplicative still and not abstracted to an acceptible level in my opionion.

---

## API Improvements

1. **Filter by jsonb for Search Filters**  
   I was running into some issues getting the sql query on the specialties jsonb working. Due to time, I chose to more on to other pieces, and left the filter as a post filter after the search and sort were applied. This is non-performant and really should be included in the db call.

2. **Error Handling & Validation**  
    The api is currently ignoring unknown filter and sort types. That can be very confusing to users if the client starts allowing for more options and the backend is not updated. There is also limited to no error handling on the backend yet.
   
3. **Expand Sort and Filter**  
   As mentioned in other spots, My goal was to get a simple sort, filter, and search working on the API. Would be nice to expand this functionality. The code would need to be refactored to be more reusable for more than one option each.

4. **Implement Pagination**  
   As the dataset grows, pagination will be a key feature for performance (& usability).

5. **Testing**  
    I would start implementing unit testing on the api as well.