App Name: MEAN-IT


User Stories:

REGULAR USER:

- When navigating to mean-it/login, user sees a login page.
	- If user account does not exist, the user must register their account.

- Once logged in, user will see an all topics page (views/topics/index.ejs).

- When a user clicks on a topic, they see that topic and its posts (views/topics/show.ejs).

- When a user clicks on a post, they see that post and its comments (views/posts/show.ejs).

- On the post's page, a user may post, edit or delete their own comment (POST TO views/posts/show.ejs)...(i.e. topicID/postID)


SUPER USER:

- Super users can do all of the above AND

	- When a superuser sees the 'all topics page', they can create a topic.

	- Upon clicking 'create topic', they are taken to a create page (views/topics/new.ejs) and will post to the topics page(/topics).

	- A superuser can edit each topic, by clicking the topic.
		
		- When a user clicks the 'edit topic' link, the are taken to an edit page (views/topics/edit.ejs). The edit will post to (/topicID).

	-On a topic, a superuser can edit and delete posts.

	- When a superuser clicks 'edit', they're taken to a page where they can edit a post. The edit page will PUT/POST to the /postID

