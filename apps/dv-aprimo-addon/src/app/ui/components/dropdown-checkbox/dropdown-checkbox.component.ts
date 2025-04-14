import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TreeNode {
  id: string;
  label: string;
  value: any;
  selected: boolean;
  indeterminate?: boolean;
  children?: TreeNode[];
}

@Component({
  selector: 'app-dropdown-checkbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dropdown-checkbox.component.html',
  styleUrl: './dropdown-checkbox.component.css',
})
export class DropdownCheckboxComponent {
     // Add Output to emit selected values
  @Output() selectionChange = new EventEmitter<any[]>();

  // Get all selected values
  private getSelectedValues(): any[] {
    const values: any[] = [];
    const collectValues = (nodes: TreeNode[]) => {
      for (const node of nodes) {
        if (node.selected) {
          values.push(node.value);
        }
        if (node.children) {
          collectValues(node.children);
        }
      }
    };
    collectValues(this.options);
    return values;
  }
  isOpen = false;
  options: TreeNode[] = [
    {
      id: '1',
      label: 'Category 1',
      value: 'category1',
      selected: false,
      children: [
        { id: '1-1', label: 'Option 1.1', value: 'option1.1', selected: false },
        { id: '1-2', label: 'Option 1.2', value: 'option1.2', selected: false },
        { id: '1-3', label: 'Option 1.3', value: 'option1.3', selected: false },
      ]
    },
    {
      id: '2',
      label: 'Category 2',
      value: 'category2',
      selected: false,
      children: [
        { id: '2-1', label: 'Option 2.1', value: 'option2.1', selected: false },
        { id: '2-2', label: 'Option 2.2', value: 'option2.2', selected: false },
      ]
    }
  ];

  get selectedCount(): number {
    return this.countSelectedOptions(this.options);
  }

  private countSelectedOptions(nodes: TreeNode[]): number {
    let count = 0;
    for (const node of nodes) {
      if (node.children) {
        count += this.countSelectedOptions(node.children);
      } else if (node.selected) {
        count++;
      }
    }
    return count;
  }

  toggleParent(parent: TreeNode): void {
    const newState = !parent.selected;
    parent.selected = newState;
    parent.indeterminate = false;
    
    if (parent.children) {
      parent.children.forEach(child => {
        child.selected = newState;
      });
    }
    
    // Emit updated selection
    this.selectionChange.emit(this.getSelectedValues());
  }

  toggleChild(parent: TreeNode, child: TreeNode): void {
    child.selected = !child.selected;
    
    if (parent.children) {
      const selectedChildren = parent.children.filter(c => c.selected);
      
      if (selectedChildren.length === 0) {
        parent.selected = false;
        parent.indeterminate = false;
      } else if (selectedChildren.length === parent.children.length) {
        parent.selected = true;
        parent.indeterminate = false;
      } else {
        parent.selected = false;
        parent.indeterminate = true;
      }
    }
    
    // Emit updated selection
    this.selectionChange.emit(this.getSelectedValues());
  }
}
