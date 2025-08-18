# Naming

Different developers have different experiences and contexts, which can lead to misunderstandings on the team when the same entities are called differently. For example:

* Components for display can be called "ui", "components", "ui-kit", "views", …
* The code that is reused throughout the application can be called "core", "shared", "app", …
* Business logic code can be called "store", "model", "state", …

## Naming in Feature-Sliced Design[​](#naming-in-fsd "Sarlavhaga to'g'ridan-to'g'ri havola")

The methodology uses specific terms such as:

* "app", "process", "page", "feature", "entity", "shared" as layer names,
* "ui', "model", "lib", "api", "config" as segment names.

It is very important to stick to these terms to prevent confusion among team members and new developers joining the project. Using standard names also helps when asking for help from the community.

## Naming Conflicts[​](#when-can-naming-interfere "Sarlavhaga to'g'ridan-to'g'ri havola")

Naming conflicts can occur when terms used in the FSD methodology overlap with terms used in the business:

* `FSD#process` vs simulated process in an application,
* `FSD#page` vs log page,
* `FSD#model` vs car model.

For example, a developer who sees the word "process" in the code will spend extra time trying to figure out what process is meant. Such **collisions can disrupt the development process**.

When the project glossary contains terminology specific to FSD, it is critical to be careful when discussing these terms with the team and technical disinterested parties.

To communicate effectively with the team, it is recommended that the abbreviation "FSD" be used to prefix the methodology terms. For example, when talking about a process, you might say, "We can put this process on the FSD features layer."

Conversely, when communicating with non-technical stakeholders, it is better to limit the use of FSD terminology and refrain from mentioning the internal structure of the code base.

## See also[​](#see-also "Sarlavhaga to'g'ridan-to'g'ri havola")

* [(Discussion) Adaptability of naming](https://github.com/feature-sliced/documentation/discussions/16)
* [(Discussion) Entity Naming Survey](https://github.com/feature-sliced/documentation/discussions/31#discussioncomment-464894)
* [(Discussion) "processes" vs "flows" vs ...](https://github.com/feature-sliced/documentation/discussions/20)
* [(Discussion) "model" vs "store" vs ...](https://github.com/feature-sliced/documentation/discussions/68)
