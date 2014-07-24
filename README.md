bootstrap-batfink
=================

Used to make a bootstrap-based css-file with only the parts of bootstrap that you are interested in. See ```./bootstrap/less/bootstrap.less``` for alternatives after you have run gulp init.

## To use

```bash
npm i
```

Then comment in/out the less-files you want to include from bootstrap in config.yml

```yaml
bootstrap:
# Core variables and mixins
    - variables
    - mixins

# Reset and dependencies
    - normalize
    - print
    - glyphicons

# Core CSS
    - scaffolding
    - type
    - code
    - grid
    - tables
    - forms
    - buttons

# Components
    # - component-animations
    # - dropdowns
    # - button-groups
    # - input-groups
    # - navs
    # - navbar
    # - breadcrumbs
    # - pagination
    # - pager
    # - labels
    # - badges
    # - jumbotron
    # - thumbnails
    # - alerts
    # - progress-bars
    # - media
    # - list-group
    # - panels
    # - responsive-embed
    # - wells
    # - close

# Components w/ JavaScript
    # - modals
    # - tooltip
    # - popovers
    # - carousel

# Utility classes
    - utilities
    - responsive-utilities
```

…and the browsers you want to support (used by autoprefixer)

```yaml
browsers:
    - Android 2.3
    - Android >= 4
    - Chrome >= 20
    - Firefox >= 24
    - Explorer >= 9
    - iOS >= 6
    - Opera >= 12
    - Safari >= 6
```

Start by running ```gulp init```. This copies the less-files from ```./node_modules/bootstrap/less``` to ```./bootstrap/less```, and then copies "variables.less" and "theme.less" to ```./theme```. These are the files you want to modify.

Modify variables.less, and run ```gulp``` which builds "bootstrap-modified.css" with sourcemap to ```./dist```.

Note that this task replaces the content of ```./bootstrap/less/variables.less``` with ```./theme/variables.less``` in memory while the task is running. It does not overwrite the original file on disk. I haven’t tested yet how this affects the source-maps.

The theme.less file isn’t used for anything at this moment. The plan is also to push the dist-folder to gh-pages for preview purposes.
