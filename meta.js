var shell = require('shelljs');

module.exports = {
  "helpers": {
    "if_or": function (v1, v2, options) {
      if (v1 || v2) {
        return options.fn(this);
      }

      return options.inverse(this);
    },
    "if_in_object": function(elem, object, options) {

      if(!! object)
        if(elem in object)
          return options.fn(this);

      return options.inverse(this);
    }
  },

  "prompts": {
    "name": {
      "type": "string",
      "required": true,
      "label": "Project name"
    },
    "description": {
      "type": "string",
      "required": true,
      "label": "Project description",
      "default": "A hybrid application"
    },
    "author": {
      "type": "string",
      "label": "Author"
    },

    "platforms": {
      "type": "checkbox",
      "required": true,
      "message": "Select the platform/s",
      "choices": [
        {
          "name": "Android",
          "value": "android",
          "short": "Android",
        },
        {
          "name": "iOS",
          "value": "ios",
          "short": "iOS",
        },
      ],
      validate: function(answer) {
        if(answer.length < 1) {
          return 'You must choose at least one platform'
        }
        return true;
      }
    },

    "category": {
      "type": "list",
      "required": true,
      "message": "Category",
      "choices": [
        {
          "name": "Social",
          "value": "social",
          "short": "social"
        },
        {
          "name": "Music",
          "value": "music",
          "short": "music"
        },
        {
          "name": "Tools",
          "value": "tools",
          "short": "tools"
        },
        {
          "name": "None",
          "value": "None",
          "short": "None"
        }
      ]
    },

    "social": {
      "when": "category=='social'",
      "type": "checkbox",
      "message": "Which features do you want to include",
      "choices": [
        {
          "name": "Pause",
          "value": "Pause",
          "short": "pause",
        },

        {
          "name": "Replay",
          "value": "Replay",
          "short": "replay"
        },

        {
          "name": "Copy Post",
          "value": "Copy Post",
          "short": "copy Post"
        },

        {
          "name": "Translation",
          "value": "Translation",
          "short": "translation"
        },

        {
          "name": "Zoom",
          "value": "zoom  ",
          "short": "zoom"
        },

        {
          "name": "Material Design",
          "value": "material_design",
          "short": "material Design"
        },

        {
          "name": "Live",
          "value": "Live",
          "short": "live"
        },

        {
          "name": "Repost",
          "value": "Repost",
          "short": "repost"
        },

        {
          "name": "Rotate",
          "value": "rotate",
          "short": "rotate"
        },

        {
          "name": "Unfollow",
          "value": "Unfollow",
          "short": "unfollow"
        },
      ]

    },

    "music": {
      "when": "category=='music'",
      "type": "checkbox",
      "message": "Which features do you want to include",
      "choices": [
        {
          "name": "Replay",
          "value": "Replay",
          "short": "replay"
        },

        {
          "name": "Shuffle",
          "value": "Shuffle",
          "short": "shuffle"
        },

        {
          "name": "Upload",
          "value": "Upload",
          "short": "upload"
        },

        {
          "name": "Sleep",
          "value": "Sleep",
          "short": "sleep"
        },

        {
          "name": "Lyric",
          "value": "Lyric",
          "short": "lyric"
        },

        {
          "name": "Theme",
          "value": "Theme",
          "short": "theme"
        },

        {
          "name": "Offline",
          "value": "Offline",
          "short": "offline"
        },

        {
          "name": "Widget",
          "value": "Widget",
          "short": "widget"
        },

        {
          "name": "Premium",
          "value": "Premium",
          "short": "premium"
        },
      ]

    },


    "tools": {
      "when": "category=='tools'",
      "type": "checkbox",
      "message": "Which features do you want to include",
      "choices": [
        {
          "name": "Theme",
          "value": "Theme",
          "short": "theme"
        },

        {
          "name": "Applock",
          "value": "Applock",
          "short": "applock"
        },

        {
          "name": "Block",
          "value": "Block",
          "short": "block"
        },

        {
          "name": "Notification",
          "value": "Notification",
          "short": "notification"
        },

        {
          "name": "Schedule",
          "value": "Schedule",
          "short": "schedule"
        },

        {
          "name": "Kill",
          "value": "Kill",
          "short": "kill"
        },

        {
          "name": "RAM-Clear",
          "value": "RAM-Clear",
          "short": "RAM-Clear"
        },

        {
          "name": "Backup",
          "value": "Backup",
          "short": "backup"
        },

        {
          "name": "Vault",
          "value": "Vault",
          "short": "vault"
        },

        {
          "name": "Fingerprint",
          "value": "Fingerprint",
          "short": "fingerprint"
        },
      ]

    }
  },
  "complete": function(data) {

    if(!data.inPlace) {
      shell.cd(data.destDirName);
    }

    shell.echo("\n");

    //install packages
    shell.echo("Thesis: Installing packages...");
    shell.exec("npm install");

    //create the cordova app
    shell.echo("Thesis: Creating cordova app...");
    shell.exec("cordova create MobileApp")

    // Navigate to mobile app directory
    shell.cd('MobileApp')

    //configuring platforms
    shell.echo("Thesis: Configuring platforms...")

    // Add platforms
    for (var platform in data.platforms) {

      shell.exec("cordova platform add " + platform);

    }

    // Remove cordova files
    shell.exec("rm ./www/index.html")
    shell.exec("rm ./www/css/index.css")
    shell.exec("rm ./www/js/index.js")

    //compile assets and compy to the android folder
    shell.echo("Thesis: Compiling assets")
    shell.exec("gulp");


  },
  // "completeMessage": "{{#inPlace}}To get started:\n\n  npm install\n  npm run dev.{{else}}To get started:\n\n  cd {{destDirName}}\n  npm install\n  npm run dev.{{/inPlace}}"
}
