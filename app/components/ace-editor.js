import Ember from 'ember';
import ace from 'npm:brace';
import 'npm:brace/theme/textmate';
import 'npm:brace/mode/markdown';

export default Ember.Component.extend({
  didInsertElement: function() {
    this.editor = ace.edit(this.get('element'));
    this.editor.setHighlightActiveLine(true);
    this.editor.setShowPrintMargin(false);
    this.editor.setTheme("ace/theme/textmate");
    this.editor.getSession().setMode("ace/mode/markdown");

    this.editor.on('change', function(){
      this.set('value', this.editor.getSession().getValue());
    }.bind(this));
  },
  valueChanged: function () {
    if (!this.get('value')) {
      this.editor.getSession().setValue('');
    } else if (this.editor.getSession().getValue() !== this.get('value')) {
      this.editor.getSession().setValue(this.get('value'));
    }
  }.observes('value')
});
